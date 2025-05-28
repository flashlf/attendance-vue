export const convertDate = (data: string | null | undefined): string => {
    if (!data) return "-"
    const date = new Date(data)
    if (isNaN(date.getTime())) return "-"
    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date)
}
