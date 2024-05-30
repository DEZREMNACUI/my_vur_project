import dayjs from 'dayjs'

export function formatMonthDay(date: Date, formatStr = "MM月DD日") {
  return dayjs(date).format(formatStr)
}

export function getDiffDays(startDate: Date, endDate: Date) {
  return dayjs(endDate).diff(startDate, "day")
}
