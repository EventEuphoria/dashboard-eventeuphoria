import Link from "next/link";
import Login from "./[login]";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full items-center ">
      <div className="m-0 flex justify-center lg:items-center bg-dspDarkPurple relative min-h-[50vh] lg:h-screen w-full ">
        <Link href="/" className="z-20 w-fit h-fit text-white font-bold text-head2 lg:text-head1 tracking-tighter">EventEuphoria</Link>
      </div>
      <div className="flex flex-col items-center justify-center -mt-56 lg:mt-0 py-10 lg:w-full relative">
        <div className=" flex flex-col gap-5 z-10 h-fit backdrop-blur-xl min-w-[350px] max-w-[500px] text-center rounded-xl p-10 shadow-boxed shadow-dspLightGray lg:shadow-none max-h-screen">
          <h1 className=" text-tXxl font-bold text-white lg:text-black text-center">
            Login
          </h1>
          <Login />
          <span>
            Don&apos;t have account?{" "}
            <Link href="/register" className="text-dspPurple hover:scale-105 ease-in-out transition-all duration-500 hover:text-dspDarkPurple">
              Register here
            </Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
