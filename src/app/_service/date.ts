export const getFormattedDate = (): string => {
    const today = new Date();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    return `${today.getFullYear()}${(m.toString().padStart(2, '0'))}${(d.toString().padStart(2, '0'))}`;
}

// 월과 일을 가져오는 별도의 함수
export const getMonthAndDay = (): { year?: number, month: number, day: number } => {
    const today = new Date();
    return {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
    };
}

export const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}