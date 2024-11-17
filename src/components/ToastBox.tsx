export default function ToastBox({ message, color }:{message:string, color:string}) {
  return (
    <div className={`alert ${"alert-" + color}`}>
      <span>{message}</span>
    </div>
  )
}