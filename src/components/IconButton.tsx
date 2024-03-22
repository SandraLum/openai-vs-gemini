import { MouseEventHandler } from "react"

interface Props {
  className: string | undefined
  icon: string | undefined
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
}

export default function IconButton(props: Props) {
  const { className = "", icon = "" } = props

  function onHandleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <button
      className={`material-symbols-outlined ` + className}
      onClick={onHandleClick}
    >
      {icon}
    </button>
  )
}
