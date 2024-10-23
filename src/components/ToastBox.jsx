export default function ToastBox({ message, color }) {
  return (
    <div className={`alert ${"alert-" + color}`}>
      <span>{message}</span>
    </div>
  )
}