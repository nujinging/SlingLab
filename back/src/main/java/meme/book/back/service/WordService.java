package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.word.*;
import meme.book.back.entity.Scrap;
import meme.book.back.entity.Word;
import meme.book.back.entity.WordContent;
import meme.book.back.exception.CustomException;
import meme.book.back.repository.scrap.ScrapRepository;
import meme.book.back.repository.word.WordRepository;
import meme.book.back.repository.wordContent.WordContentRepository;
import meme.book.back.utils.ErrorCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class WordService {

    private final WordRepository wordRepository;
    private final WordContentRepository wordContentRepository;
    private final ScrapRepository scrapRepository;

    // 단일 단어의 컨텐츠 조회
    @Transactional(readOnly = true)
    public WordContentListResponseDto getWordContent(Pageable pageable, Long wordIdx, Long memberIdx) {
        Word word = wordRepository.findByWordIdx(wordIdx).orElseThrow(() -> {
            throw new CustomException(ErrorCode.NOT_EXIST_WORD);
        });

        Page<WordContent> wordContentList = wordContentRepository.findByWordIdx(wordIdx, pageable);
        Page<WordContentDto> wordContentDtoList = WordContentDto.toPageDto(wordContentList);
        log.debug("### Get Word Content: {}", word.getWordIdx());

        Scrap scrap = scrapRepository.findByWordIdxAndMemberIdx(wordIdx, memberIdx).orElseGet(Scrap::new);

        return new WordContentListResponseDto()
                .setWordContentList(wordContentDtoList.getContent())
                .setWordIdx(word.getWordIdx())
                .setWordName(word.getWordName())
                .setWordLike(word.getWordLike())
                .setWordDislike(word.getWordDislike())
                .setScrapIdx(scrap.getScrapIdx())
                .setTotalPage(wordContentDtoList.getTotalPages())
                .setTotalCount(wordContentDtoList.getTotalElements());
    }

    @Transactional(readOnly = true)
    public WordListResponseDto getWordListService(Pageable pageable, WordRequestDto requestDto) {
        Page<WordListDto> wordDtoList = wordRepository.getAllWordList(pageable, requestDto);
        log.info("### Get Word: {}", wordDtoList.getContent());

        return new WordListResponseDto()
                .setWordList(wordDtoList.getContent())
                .setNowPage(wordDtoList.getNumber()+1)
                .setNowCount(wordDtoList.getNumberOfElements())
                .setTotalPage(wordDtoList.getTotalPages())
                .setTotalCount(wordDtoList.getTotalElements());
    }

    // 단어 생성
    @Transactional
    public WordUpsertResponseDto createWord(WordInsertRequestDto requestDto) {
        WordUpsertResponseDto responseDto = new WordUpsertResponseDto();

        // 1. 기존 단어 존재 여부 확인
        Optional<Word> optionalWord = wordRepository.findByWordName(requestDto.getWordName());

        if (optionalWord.isPresent()) {
            // 기존 단어 존재 (단어 컨텐츠만 추가)
            Word word = optionalWord.get();

            Optional<WordContent> optionalWordContent = wordContentRepository
                    .findByWordIdxAndMemberIdx(word.getWordIdx(), requestDto.getMemberIdx());

            if (optionalWordContent.isPresent()) {
                // 이미 회원이 등록한 단어 있으면 에러 처리
                throw new CustomException(ErrorCode.ALREADY_EXIST_MEMBER_WORD);
            }

            WordContent wordContent = new WordContent()
                    .setWordIdx(word.getWordIdx())
                    .setMemberIdx(requestDto.getMemberIdx())
                    .setContent(requestDto.getWordContent());
            wordContentRepository.save(wordContent);

            responseDto.setWordIdx(word.getWordIdx());
            log.info("### Exist Word: {}, New Word Content: {}", word, wordContent);
        } else {
            // 2. 기존 단어 없음 (단어 및 컨텐츠 추가)
            Word word = new Word()
                    .setWordName(requestDto.getWordName())
                    .setWordNation(requestDto.getWordNation());
            wordRepository.save(word);

            WordContent wordContent = new WordContent()
                    .setWordIdx(word.getWordIdx())
                    .setMemberIdx(requestDto.getMemberIdx())
                    .setContent(requestDto.getWordContent());
            wordContentRepository.save(wordContent);

            responseDto.setWordIdx(word.getWordIdx());
            log.info("### New Word: {}, New Word Content: {}", word, wordContent);
        }

        responseDto.setWordName(requestDto.getWordName())
                .setMemberIdx(requestDto.getMemberIdx());

        return responseDto;
    }

    // 단어 수정
    @Transactional
    public WordUpsertResponseDto updateWord(WordUpsertRequestDto requestDto) {

        Long wordIdx = requestDto.getWordIdx();
        Long memberIdx = requestDto.getMemberIdx();

        WordContent wordContent = wordContentRepository.findByWordIdxAndMemberIdx(wordIdx, memberIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_CONTENT_USER));

        wordContent.setContent(requestDto.getWordContent());
        wordContentRepository.save(wordContent);

        log.info("### update Word Content: {}", wordContent);
        return new WordUpsertResponseDto().setWordIdx(requestDto.getWordIdx())
                .setWordContent(requestDto.getWordContent())
                .setMemberIdx(requestDto.getMemberIdx());
    }

    @Transactional
    public void deleteAllWordContent(Long memberIdx) {
        List<WordContent> wordContentList = wordContentRepository.findAllByMemberIdx(memberIdx);
        List<Long> wordIdxList = wordContentList.stream().map(WordContent::getWordIdx).distinct().toList();

        wordContentRepository.deleteAll(wordContentList);
        log.info("Deleted Word Content: {}", wordContentList);

        List<Word> wordList = wordRepository.getWordListByNotExistContent(wordIdxList);

        wordRepository.deleteAll(wordList);
        log.info("Deleted Word Idx List: {}", wordList);
    }

    @Transactional
    public void deleteWordContentList(List<Long> wordContentIdxList) {
        List<WordContent> wordContentList = wordContentRepository.findAllByWordContentIdxIn(wordContentIdxList);
        List<Long> wordIdxList = wordContentList.stream().map(WordContent::getWordIdx).distinct().toList();

        wordContentRepository.deleteAll(wordContentList);
        log.info("Deleted Word Content: {}", wordContentList);

        List<Word> wordList = wordRepository.getWordListByNotExistContent(wordIdxList);

        wordRepository.deleteAll(wordList);
        log.info("Deleted Word Idx List: {}", wordList);

    }

    public WordContentListResponseDto getWordListByMember(Pageable pageable, Long memberIdx) {
        Page<WordContentDto> wordContentDtoList = wordContentRepository.getWordContentListByMemberIdx(pageable, memberIdx);

        return new WordContentListResponseDto()
                .setWordContentList(wordContentDtoList.getContent())
                .setTotalPage(wordContentDtoList.getTotalPages())
                .setTotalCount(wordContentDtoList.getTotalElements());
    }
}
