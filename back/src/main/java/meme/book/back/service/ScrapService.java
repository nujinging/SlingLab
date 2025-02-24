package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.scrap.ScrapDto;
import meme.book.back.dto.scrap.ScrapRequestDto;
import meme.book.back.dto.scrap.ScrapResponseDto;
import meme.book.back.entity.Scrap;
import meme.book.back.exception.CustomException;
import meme.book.back.repository.scrap.ScrapRepository;
import meme.book.back.utils.ErrorCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class ScrapService {

    private final ScrapRepository scrapRepository;

    @Transactional(readOnly = true)
    public Page<ScrapResponseDto> getScrapList(Pageable pageable, Long memberIdx) {

        Page<ScrapResponseDto> scrapResponseDtoList = scrapRepository.getScrapListByMemberIdx(pageable, memberIdx);
        log.info("### Get Scrap List: {}", scrapResponseDtoList.getContent());

        return scrapResponseDtoList;
    }

    @Transactional
    public ScrapDto saveScrap(ScrapRequestDto scrapDto) {

        scrapRepository.findByWordIdxAndMemberIdx(scrapDto.getWordIdx(), scrapDto.getMemberIdx())
                .ifPresent(scrap -> {
                    throw new CustomException(ErrorCode.ALREADY_EXIST_MEMBER_SCRAP);
                });

        Scrap scrapEntity = new Scrap()
                .setWordIdx(scrapDto.getWordIdx())
                .setMemberIdx(scrapDto.getMemberIdx())
                .setRegDtm(LocalDateTime.now());

        scrapRepository.save(scrapEntity);
        log.info("### Save Scrap: {}, ", scrapEntity);

        return ScrapDto.toDto(scrapEntity);
    }

    @Transactional
    public void deleteAllWordScrap(Long memberIdx) {
        List<Scrap> scrapList = scrapRepository.findAllByMemberIdx(memberIdx);

        scrapRepository.deleteAll(scrapList);
        log.info("Delete Scrap: {}", scrapList);
    }

    @Transactional
    public void deleteWordScrapList(List<Long> scrapIdxList) {
        List<Scrap> scrapList = scrapRepository.findAllByScrapIdxIn(scrapIdxList);

        scrapRepository.deleteAll(scrapList);

        log.info("Delete Scrap List: {}", scrapIdxList);

    }
}
