import { useState , useEffect} from 'react'
import { motion } from 'framer-motion';


function App() {
  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(user?.name);

  const fetchUser = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://randomuser.me/api/?page=1&results=1&seed=abc');
      const data = await response.json();
      setUser(data.results[0]);
    } catch (err) {
      setError('Failed to fetch user data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  };

  const infoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      .
      <motion.div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden "
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-evenly p-8">
          <motion.div
            className="flex justify-center items-center mx-10"
            variants={imageVariants}
          >
            <img
              src={user.picture.large}
              alt="User's image"
              className="rounded-full w-48 h-48 object-cover border-4 border-blue-500 shadow-lg"
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center space-y-4 px-10"
            variants={infoVariants}
          >
            <h2 className="text-3xl font-bold text-gray-800">
              {user.name.first} {user.name.last}
            </h2>
            <p className="text-xl text-gray-600">{user.email}</p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Gender:</span> {user.gender}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Location:</span> {user.location.city}, {user.location.country}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Age:</span> {user.dob.age}
            </p>
          </motion.div>
        </div>
        {/* <motion.div
          className="bg-blue-500 p-4 flex justify-center"
          whileHover={{ backgroundColor: '#2c5282' }}
        >
          <motion.button
            className="text-white font-bold py-2 px-4 rounded"
            onClick={fetchUser}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Refresh User
          </motion.button>
        </motion.div> */}
      </motion.div>
    </div>
  );
}

export default App
