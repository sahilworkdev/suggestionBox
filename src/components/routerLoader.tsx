"use client";

import { useLinkStatus } from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RouteLoader() {
  const { pending } = useLinkStatus();
  const [show, setShow] = useState(false);


  useEffect(() => {
    if (pending) {
      const timer = setTimeout(() => setShow(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [pending]);

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <motion.div
        className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
