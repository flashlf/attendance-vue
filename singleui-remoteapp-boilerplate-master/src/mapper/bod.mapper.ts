import { BodMessageResponse, BodMessageType } from "@/api/feature/model/Example.dto"
import { convertDate } from "@/utils/FormatDate"

export const listBodDataMapper = (data: BodMessageType): BodMessageResponse => ({
    id: data.id,
    title: data.title,
    description: data.content,
    personName: `${data.authorName + " - " + data.authorTitle}`,
    authorTitle: data.authorTitle,
    image: data.photoUrl,
    photoHash: data.photoHash,
    date: convertDate(data.publishDate),
})
