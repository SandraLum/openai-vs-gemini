interface Props {
  color?: string | undefined
  size?: string | undefined
  className?: string | undefined
}

export default function LoadingSpinner(props: Props) {
  const { color = "text-blue-600", size = "size-6", className = "" } = props
  return (
    <div
      className={
        `animate-spin inline-block border-[3px] border-current border-t-transparent rounded-full dark:text-blue-500 ${size} ${color} dark:${color} ` +
        className
      }
    />
  )
}
