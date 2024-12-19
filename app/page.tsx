import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./components/form";

export default function Home() {
  return (
    <main className="flex min-h-screen p-24 bg-gradient-to-br from-primary to-copper">
      <div className="grow flex flex-col items-center justify-center border border-t-0 border-b-0 border-l-0 border-r-copper gap-3">
        <Image
          src="/assets/svg/echoes-icon.svg"
          alt='echoes icon'
          width={300}
          height={300}
          className="animate-[pulse_3s_ease-in-out_infinite]"
        />

        <h1 className="font-bold text-7xl">ECHOES</h1>
        <p className="font-thin text-lg">Art Journaling Platform</p>
      </div>

      <div className="grow flex flex-col items-center justify-center gap-4 p-4">
        <Link className='btn btn-ghost btn-wide' href='/api/auth/signin'>Sign In</Link>
        <p> - OR - </p>
        <SignUpForm />
      </div>
    </main>
  );
}