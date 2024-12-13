import LogoutButton from "./LogoutButton";

export default function CookieErrorUI() {
  return (
    <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center flex-1">
      <div className="prose">
        <h1 className="mb-4 text-center">Error</h1>
      </div>
      <p className="mb-2">A cookie error occured. Please log out and sign in again.</p>
      <LogoutButton width={true} />
    </div>
  )
}