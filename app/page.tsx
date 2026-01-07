import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-col w-full min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Divansh Bajaj</h1>
      <Image src="https://masti-uploads.s3.ap-south-1.amazonaws.com/uploads/pic.jpeg" height={200} width={200} alt="pic"/>
    </div>
  );
} 
