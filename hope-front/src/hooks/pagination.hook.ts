import { useState, useEffect, useCallback, useMemo } from 'react';

// CommentListItem 인터페이스를 사용한다고 가정하고 writeDatetime 정렬을 적용합니다.
// 제네릭 타입 T가 writeDatetime 속성을 가지고 있다고 가정합니다.
interface SortableByDate {
    writeDatetime: string;
}

// 제네릭 T는 SortableByDate 인터페이스를 확장해야 함을 명시적으로 표시 (타입 안정성 증가)
const usePagination = <T extends SortableByDate>(itemsPerPage: number, pagesPerSection: number = 10) => {
    const [totalList, setTotalListState] = useState<T[]>([]); // 외부에서 받은 원본 전체 목록 상태

    const [viewList, setViewList] = useState<T[]>([]); // 현재 페이지에 보여줄 객체 리스트 상태

    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호 상태
    const [totalPage, setTotalPage] = useState<number>(1); // 전체 페이지 수 상태

    const [currentSection, setCurrentSection] = useState<number>(1); // 현재 섹션 상태
    const [totalSection, setTotalSection] = useState<number>(1); // 전체 섹션 상태
    const [viewPageList, setViewPageList] = useState<number[]>([]); // 현재 섹션에 보여줄 페이지 번호 리스트 상태

    // useMemo: totalList가 변경될 때마다 정렬된 새로운 목록 생성
    const sortedTotalList = useMemo(() => {
        if (!totalList || totalList.length === 0) return [];

        // 원본 배열을 변경하지 않기 위해 복사본 생성
        const listToSort = [...totalList];

        // 작성일시 (writeDatetime) 기준으로 오름차순 정렬 (오래된 것부터)
        listToSort.sort((a, b) => {
            const dateA = new Date(a.writeDatetime);
            const dateB = new Date(b.writeDatetime);

            // 유효하지 않은 날짜 처리: 유효하지 않으면 순서에 영향을 주지 않음 (또는 특정 위치로 보낼 수 있음)
            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                 if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0; // 둘 다 유효하지 않으면 순서 그대로
                 if (isNaN(dateA.getTime())) return 1; // a만 유효하지 않으면 b 뒤로 보냄
                 if (isNaN(dateB.getTime())) return -1; // b만 유효하지 않으면 a 뒤로 보냄
            }

            // 오름차순 정렬: dateA - dateB (작은 값이 앞으로)
            return dateA.getTime() - dateB.getTime();
        });

        return listToSort; // 정렬된 목록 반환
    }, [totalList]); // totalList가 변경될 때만 다시 실행

    // --- 계산 함수 (useCallback으로 메모이제이션) ---

    // 현재 페이지에 보여줄 목록 계산 (정렬된 목록 사용)
    const calculateViewList = useCallback((list: T[], page: number, perPage: number) => {
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            return list.slice(startIndex, endIndex);
        },[]);

    // 전체 페이지/섹션 수 계산
    const calculateTotalInfo = useCallback((totalItems: number, perPage: number, perSection: number) => {
            const totalPgs = Math.max(1, Math.ceil(totalItems / perPage)); // 0개 항목일 때 최소 1 페이지
            const totalSects = Math.max(1, Math.ceil(totalPgs / perSection)); // 0페이지일 때 최소 1 섹션
            return { totalPgs, totalSects };
        },[]);

    // 현재 페이지에 따른 현재 섹션 계산
    const calculateCurrentSection = useCallback((page: number, perSection: number) => {
            return Math.ceil(page / perSection);
        },[]);

    // 현재 섹션에 보여줄 페이지 목록 계산
    const calculateViewPageList = useCallback((currentSect: number, perSection: number, totalPgs: number) => {
            const startPage = (currentSect - 1) * perSection + 1;
            const endPage = Math.min(currentSect * perSection, totalPgs);
            const pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            return pages;
        },[]);

    // --- 네비게이션 함수 (useCallback으로 메모이제이션) ---

    // 특정 페이지로 이동
    const goToPage = useCallback((page: number) => {
            const newPage = Math.max(1, Math.min(page, totalPage)); // 페이지 범위 제한
            if (newPage !== currentPage) {
                setCurrentPage(newPage);
            }
        },
        [currentPage, totalPage] // 현재 페이지와 전체 페이지에 의존
    );

    // 다음 페이지로 이동
    const nextPage = useCallback(() => {
        if (currentPage === totalPage) return;
        goToPage(currentPage + 1);
    }, [currentPage, goToPage, totalPage]);
    
    // 이전 페이지로 이동
    const prevPage = useCallback(() => {
        if (currentPage === 1) return;
        goToPage(currentPage - 1);
    }, [currentPage, goToPage]);

    // 특정 섹션으로 이동 (섹션의 첫 페이지로 이동)
    const goToSection = useCallback((section: number) => {
            const targetSection = Math.max(1, Math.min(section, totalSection)); // 섹션 범위 제한
            const firstPageInSection = (targetSection - 1) * pagesPerSection + 1;
            // 계산된 섹션이 현재 섹션과 다르면 해당 섹션의 첫 페이지로 이동
            if (targetSection !== currentSection || firstPageInSection !== currentPage) { // 현재 페이지가 이미 섹션 첫 페이지인 경우 제외
                 goToPage(firstPageInSection);
            }
        },
        [currentSection, totalSection, pagesPerSection, goToPage, currentPage] // 의존성 추가: goToPage, currentPage
    );


    // 다음 섹션으로 이동
    const nextSection = useCallback(() => {
        if (currentSection === totalSection) return;
        goToSection(currentSection + 1);
    }, [currentSection, goToSection, totalSection]);

    // 이전 섹션으로 이동
    const prevSection = useCallback(() => {
        if (currentSection === 1) return;
        goToSection(currentSection - 1);
    }, [currentSection, goToSection]);


    // 외부에서 전체 목록을 업데이트하는 함수
    const setTotalList = useCallback(
        (newList: T[]) => {
            setTotalListState(newList); // 원본 전체 목록 상태 업데이트
            // 목록 변경 시 페이지와 섹션을 1로 초기화
            // 이펙트가 totalList 변경 감지 후 전체 페이지/섹션 재계산 및 현재 페이지/섹션 업데이트
            setCurrentPage(1);
            setCurrentSection(1); // 명시적으로 섹션도 초기화
        },[]);

    // --- Effects ---

    // effect: totalList, itemsPerPage, pagesPerSection 변경 시 전체 페이지/섹션 수 계산 및 현재 페이지/섹션 조정
    useEffect(() => {
        const { totalPgs, totalSects } = calculateTotalInfo(
            totalList.length, // 원본 목록 길이를 사용
            itemsPerPage,
            pagesPerSection
        );
        setTotalPage(totalPgs);
        setTotalSection(totalSects);

        // 전체 페이지/섹션 수가 줄어들었을 때, 현재 페이지/섹션이 범위를 벗어나면 조정
        const newCurrentPage = Math.max(1, Math.min(currentPage, totalPgs));
        const newCurrentSection = calculateCurrentSection(newCurrentPage, pagesPerSection);

        if (currentPage !== newCurrentPage) {
             setCurrentPage(newCurrentPage);
        }
        if (currentSection !== newCurrentSection) {
             setCurrentSection(newCurrentSection);
        }

    }, [totalList, itemsPerPage, pagesPerSection, currentPage, currentSection, calculateTotalInfo, calculateCurrentSection]);
    // currentPage와 currentSection을 의존성에 포함시켜 범위 조정 로직이 잘 작동하도록 합니다.


    // effect: currentPage, sortedTotalList, itemsPerPage 변경 시 보여줄 목록 (viewList) 업데이트
    useEffect(() => {
        // 정렬된 목록을 기반으로 viewList 계산
        setViewList(calculateViewList(sortedTotalList, currentPage, itemsPerPage));

        // 페이지 변경에 따라 현재 섹션 자동 계산 및 업데이트 (이펙트1에서도 하지만 여기서도 동기화)
        const calculatedSection = calculateCurrentSection(currentPage, pagesPerSection);
         if (calculatedSection !== currentSection) {
             setCurrentSection(calculatedSection);
         }
    }, [sortedTotalList, currentPage, itemsPerPage, pagesPerSection, currentSection, calculateViewList, calculateCurrentSection]);
    // sortedTotalList가 변경될 때 (totalList가 변경되면 sortedTotalList도 변경) 이펙트가 실행됩니다.

    // effect: currentSection, totalPage, pagesPerSection 변경 시 보여줄 페이지 목록 (viewPageList) 업데이트
    useEffect(() => {
         setViewPageList(calculateViewPageList(currentSection, pagesPerSection, totalPage));
    }, [currentSection, totalPage, pagesPerSection, calculateViewPageList]);


    return {
        // 상태 값
        viewList, // 현재 페이지에 보여줄 객체 리스트 (이미 정렬됨)
        currentPage, // 현재 페이지 번호
        totalPage, // 전체 페이지 수
        currentSection, // 현재 섹션 번호
        totalSection, // 전체 섹션 수
        viewPageList, // 현재 섹션에 보여줄 페이지 번호 리스트

        // 전체 목록 업데이트 함수
        setTotalList, // 이 함수로 원본 목록을 넘겨주면 훅 내부에서 정렬 및 페이지 계산

        // 네비게이션 함수
        goToPage,
        nextPage,
        prevPage,
        goToSection,
        nextSection,
        prevSection,
    };
};

export default usePagination;