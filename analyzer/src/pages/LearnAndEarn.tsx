import React, { useEffect, useRef, useState } from 'react';
import Topbar from '../components/shared/Topbar';
import Footer from '../components/shared/Footer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import { Edit } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"
import { toast } from "sonner"
import { useUser, SignOutButton, UserProfile } from '@clerk/clerk-react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Loader from '../components/shared/Loader'
import { Button } from '../components/ui/button'

const ShuffleHero = () => {
  return (
    <section className="px-8 text-white py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 mx-auto bg-[#467ce8]">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-slate-200 font-medium">
          Learn and Earn Today
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Unlock Knowledge, Earn Rewards
        </h3>
        <p className="text-base md:text-lg text-white my-4 md:my-6">
          Explore our educational courses on cryptocurrency and blockchain technology. Earn tokens as you learn and grow your financial knowledge with ease.
        </p>
        <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
          <a href="#learning-content">Start Learning</a>
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVhcm5pbmd8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1639548538099-6f7f9aec3b92?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxlYXJufGVufDB8fDB8fHww",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9yZXh8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9yZXglMjB0cmFkaW5nfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1641580529558-a96cf6efbc72?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvcmV4JTIwdHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1645516484419-35a747c99474?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9yZXglMjB0cmFkaW5nfGVufDB8fDB8fHww",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1634704784915-aacf363b021f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvcmV4JTIwdHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1639754390580-2e7437267698?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvcmV4JTIwdHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1611348586755-53860f7ae57a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXglMjB0cmFkaW5nJTIwbGVhcm58ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1644924735973-0ba06d83268e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9yZXglMjB0cmFkaW5nJTIwbGVhcm58ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9yZXglMjB0cmFkaW5nJTIwZWR1Y2F0aW9ufGVufDB8fDB8fHww",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1533854775446-95c4609da544?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGZvcmV4JTIwdHJhZGluZyUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXglMjB0cmFkaW5nJTIwZWR1Y2F0aW9ufGVufDB8fDB8fHww",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};
// Sample list of courses
const courses = [
  { id: 1, title: "Introduction to Bitcoin", description: "Learn about Bitcoin", reward: "Earn 10 BTC Tokens" },
  { id: 2, title: "Ethereum Basics", description: "Learn the fundamentals of Ethereum", reward: "Earn 5 ETH Tokens" },
  { id: 3, title: "What is Blockchain?", description: "Understand how blockchain works", reward: "Earn 15 Blockchain Tokens" },
  // Add more courses
];

const Navbar = () => {
  const user = useUser()
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient();

  useEffect(() => {
    const navbarLinks = document.querySelectorAll('#nav_links')
    navbarLinks.forEach(element => {
      if (element.pathname === location.pathname) {
        element.classList.add('active_nav_link')
      }
    });
  }, [location])
  return (
    <nav className='flex flex-row items-center pt-2 top-0 Home_TopBar text-white bg-[#467ce8] flex-wrap justify-between'>
      <div className='justify-between py-4 px-5 gap-3'>
        <a href="/" className='p-5'>Token View</a>
        <a href="/analyze-token" className='p-6 nav-links' id='nav_links'>Analyze token</a>
        <a href="/trading" className='p-6 nav-links' id='nav_links'>Trading</a>
        <a href="/learn-and-earn" className='p-6 nav-links' id='nav_links'>Learn and Earn</a>
        <a href="/premium" className='p-6 nav-links' id='nav_links'>Premium</a>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <div className='flex flex-col gap-1 cursor-pointer main-div-div justify-between'>
            <div className='main-nav-div bg-white'></div>
            <div className='main-nav-div bg-white'></div>
            <div className='main-nav-div bg-white'></div>
          </div>
        </SheetTrigger>
        <SheetContent className='w-[20rem]'>
          <SheetHeader>
            <SheetTitle>Token View</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-around gap-16 items-center py-4 mt-4">
            {user.user ?
              <div className='items-center justify-center mt-4'>
                <a href="/user-dashboard" className='p-4'>Profile</a>
              </div>
              :
              <div className='items-center justify-center mt-4'>
                <a href="/sign-up" className='p-4'>Sign Up</a>
                <a href="/sign-in" className='p-4'>Sign In</a>
              </div>
            }
            <div className="items-center">
              <a href="/analyze-token" className=''>Analyze token</a>
            </div>
            <div className="items-center gap-4">
              <a href="/trading" className=''>Trading</a>
            </div>
            {/* <div className="items-center gap-4">
              <a href="/learn-and-earn" className=''>Learn and earn <Badge variant="outline">coming soon</Badge></a>
            </div> */}
            <div className="items-center gap-4">
              <a href="/premium" className=''>Premium</a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className='flex gap-4 nav-links flex-row justify-center'>
        {user.user ?
          <a href="/user-dashboard" className='p-4 mr-4' id='nav_links'><Button className='bg-primary-500 mr-4'>Profile</Button></a>
          :
          <div className='items-center justify-center'>
            <a href="/sign-up" className='p-4 mr-4' id='nav_links'><Button className='bg-primary-500'>Sign Up</Button></a>
            <a href="/sign-in" className='p-4 mr-4' id='nav_links'><Button className='bg-primary-500'>Sign In</Button></a>
          </div>
        }
      </div>
    </nav>
  )
}

const LearnAndEarn = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, 'courses'); // Use your collection name here
        const coursesSnapshot = await getDocs(coursesCollection);
        const coursesList = coursesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesList);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);
  return (
    <div>
      <Navbar />
      <ShuffleHero />
      <div className="learn-earn-section ">

        <div className="course-list grid grid-cols-3 gap-8 mt-8">
          {courses.map(course => (
            <div key={course.id} className="course-card bg-white shadow-lg p-6 rounded-lg">
              <h2 className="text-2xl font-semibold">{course.title}</h2>
              <p className="mt-4 text-gray-700">{course.description}</p>
              <p className="mt-6 font-bold">{course.reward}</p>
              <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
                Start Course
              </button>
            </div>
          ))}
        </div>
        {/* <div className='flex flex-col justify-center items-center' id='learning-content'>
          <p className='text-center text-gray-500 mt-32'>No courses available</p>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default LearnAndEarn;