import dayjs from "dayjs"
import "dayjs/locale/ko"
import "dayjs/locale/ja"
import localizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(localizedFormat)

export function formatDate(dateStr: string, locale = "ko") {
  return dayjs(dateStr).locale(locale).format("LL")
}
