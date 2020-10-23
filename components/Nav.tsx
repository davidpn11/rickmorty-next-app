import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header } from './Header';

export default function Nav() {
  const router = useRouter();

  console.log(router);

  const border = (path: string) =>
    path === router.pathname ? 'border-teal-dark' : 'border-transparent';

  return (
    <nav className="bg-ourple-500 pt-2 ">
      <div className="px-8 flex justify-center shadow-md">
        <Link href="/">
          <a
            className={`no-underline text-gray-200 border-b-4 ${border(
              '/',
            )} uppercase tracking-wide font-bold text-lg py-3 mr-8 hover:underline`}>
            Home
          </a>
        </Link>
        <Link href="/characters">
          <a
            className={`no-underline text-gray-200 border-b-4 ${border(
              '/characters',
            )} uppercase tracking-wide font-bold text-lg py-3 mr-8 hover:underline`}>
            Characters
          </a>
        </Link>
      </div>
    </nav>
    // <div>

    //   <Link href="/">
    //     <a>Home</a>
    //   </Link>
    //   <Link href="/characters">
    //     <a>Chars</a>
    //   </Link>
    // </div>
  );
}
