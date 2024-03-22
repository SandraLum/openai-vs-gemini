interface Props {
  className?: string | undefined
  icon: string | undefined
}

/**
 * https://fonts.google.com/icons
 */
export default function Icon(props: Props) {
  const { className = "", icon = "" } = props

  return (
    <span className={`material-symbols-outlined ` + className}>{icon}</span>
  )
}
