package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.reaction.ReactionCountResponseDto;
import meme.book.back.dto.reaction.ReactionDto;
import meme.book.back.dto.reaction.ReactionRequestDto;
import meme.book.back.entity.Reaction;
import meme.book.back.entity.Word;
import meme.book.back.exception.CustomException;
import meme.book.back.repository.reaction.ReactionRepository;
import meme.book.back.repository.word.WordRepository;
import meme.book.back.utils.ActionType;
import meme.book.back.utils.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReactionService {

    private final ReactionRepository reactionRepository;
    private final WordRepository wordRepository;

    @Transactional
    public ReactionDto upsertWordReaction(ReactionRequestDto reactionDto) {
        Reaction reaction;

        Word word = wordRepository.findByWordIdx(reactionDto.getWordIdx()).orElseThrow(() -> {
            throw new CustomException(ErrorCode.NOT_EXIST_WORD);
        });

        Optional<Reaction> optionalReaction = reactionRepository
                .findReactionByMemberIdxAndTargetIdx(reactionDto.getMemberIdx(), reactionDto.getWordIdx());

        if (optionalReaction.isPresent()) {
            // 기존 단어 존재
            reaction = optionalReaction.get();
            if (reaction.getReactionType().equals(reactionDto.getReactionType())) {
                // 요청과 기존값 동일시 처리 (기존 저장값 delete)
                log.info("Reaction Delete: {}", reaction.getReactionIdx());

                reactionRepository.delete(reaction);
                if (reactionDto.getReactionType().equals(ActionType.WORD_LIKE)) {
                    word.setWordLike(word.getWordLike() - 1);
                } else if (reactionDto.getReactionType().equals(ActionType.WORD_DISLIKE)) {
                    word.setWordDislike(word.getWordDislike() - 1);
                }
            } else {
                // 요청과 기존값 다를시 처리 (기존 저장값 update)
                reaction.setReactionType(reactionDto.getReactionType());
                if (reactionDto.getReactionType().equals(ActionType.WORD_LIKE)) {
                    word.setWordLike(word.getWordLike() + 1);
                    word.setWordDislike(word.getWordDislike() - 1);
                } else if (reactionDto.getReactionType().equals(ActionType.WORD_DISLIKE)) {
                    word.setWordDislike(word.getWordDislike() + 1);
                    word.setWordLike(word.getWordLike() - 1);
                }

                log.info("Reaction Update: reaction idx: {}, reaction type: {}",
                        reaction.getReactionIdx(), reaction.getReactionType());
            }

        } else {
            // 신규 단어 등록
            reaction = new Reaction()
                    .setReactionType(reactionDto.getReactionType())
                    .setTargetIdx(reactionDto.getWordIdx())
                    .setMemberIdx(reactionDto.getMemberIdx());

            if (reactionDto.getReactionType().equals(ActionType.WORD_LIKE)) {
                word.setWordLike(word.getWordLike() + 1);
            } else {
                word.setWordDislike(word.getWordDislike() + 1);
            }
            reactionRepository.save(reaction);
            log.info("Create new Reaction: {}", reaction.getReactionIdx());
        }
        wordRepository.save(word);

        return ReactionDto.toDto(reaction);
    }

    @Transactional(readOnly = true)
    public ReactionCountResponseDto countReactionService(Long wordIdx) {

        Word word = wordRepository.findByWordIdx(wordIdx).orElseThrow(() ->{
            throw new CustomException(ErrorCode.NOT_EXIST_WORD);
        });

        long likeCount = word.getWordLike();
        long dislikeCount = word.getWordDislike();

        log.info("Reaction Count By wordIdx: {}, Like Count: {}, Dislike Count: {}", wordIdx, likeCount, dislikeCount);

        return new ReactionCountResponseDto()
                .setLikeCount(likeCount)
                .setDislikeCount(dislikeCount);
    }
}
