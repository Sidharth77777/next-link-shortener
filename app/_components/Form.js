"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  WandSparkles,
  ArrowUpRight,
  Loader,
  Clipboard as ClipboardIcon,
  ClipboardCheck as ClipboardCheckIcon,
} from "lucide-react";
import { useFormStates } from "../context/WebContext";
import { toast } from "sonner";
import Link from "next/link";

const formVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, when: "beforeChildren" },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
};

const btnTap = { scale: 0.98 };
const iconHover = { y: -3, scale: 1.06 };

export default function ShortenForm() {
  const { url, setUrl, preferredUrl, setPreferredUrl, shortUrl, setShortUrl } =
    useFormStates();

  const [copyStatus, setCopyStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  // reset copy status when shortUrl changes
  useEffect(() => {
    setCopyStatus(false);
  }, [shortUrl]);

  const onCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 1800);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (!url || !url.trim()) return toast.error("Enter your long URL !");
    if (!preferredUrl || !preferredUrl.trim())
      return toast.error("Enter your preferred short name !");

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          preferredUrl: preferredUrl.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          toast.error(data?.error || "Preferred name already in use");
        } else if (res.status === 400) {
          toast.error(data?.error || "Bad request");
        } else {
          toast.error(data?.error || "Failed to create short URL");
        }
        setLoading(false);
        return;
      }

      setShortUrl(data.shortUrl);
      toast.success("Successfully generated URL ✅");
      setUrl("");
      setPreferredUrl("");
    } catch (err) {
      console.error(err);
      toast.error("Error shortening URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4">
      <motion.form
        onSubmit={handleForm}
        initial="hidden"
        animate="visible"
        variants={formVariant}
        className="flex flex-col gap-4 w-full max-w-lg mx-auto mt-8 p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur rounded-2xl shadow-lg"
      >
        <motion.div variants={childVariant}>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Long URL
          </label>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.995 }}>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL"
              className="p-3 border rounded-md dark:bg-gray-900 dark:text-white w-full"
              aria-label="Long URL"
            />
          </motion.div>
        </motion.div>

        <motion.div variants={childVariant}>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preferred short name
          </label>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.995 }}>
            <Input
              value={preferredUrl}
              onChange={(e) => setPreferredUrl(e.target.value)}
              placeholder="Enter your Preferred short name"
              className="p-3 border rounded-md dark:bg-gray-900 dark:text-white w-full"
              aria-label="Preferred short name"
            />
          </motion.div>
        </motion.div>

        <motion.div variants={childVariant} className="pt-1">
          <motion.button
            type="submit"
            whileTap={btnTap}
            whileHover={{ scale: 1.02 }}
            disabled={loading}
            className={`w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3 rounded-lg ${
              loading ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold shadow-md`}
            aria-label="Generate Short URL"
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <motion.span whileHover={iconHover} className="inline-flex">
                  <WandSparkles />
                </motion.span>
                Generate Short URL
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>

      <AnimatePresence>
        {shortUrl && (
          <motion.div
            variants={childVariant}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="w-full max-w-lg mx-auto mt-6 px-4"
          >
            <div
              className="flex flex-wrap items-center justify-between gap-3
                         md:flex-row md:items-center md:justify-between
                         max-[456px]:flex-col max-[456px]:items-center"
            >
              <div className="flex-1 min-w-0">
                <p className="text-center md:text-left text-green-600 font-medium mb-2">
                  ✔️ Shortened URL:
                </p>

                <div className="flex items-center gap-3">
                  <motion.code
                    whileHover={{ scale: 1.02 }}
                    className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 underline text-blue-500 max-w-full truncate"
                    title={typeof shortUrl === "string" ? shortUrl : JSON.stringify(shortUrl)}
                  >
                    {typeof shortUrl === "string" ? shortUrl : shortUrl?.shortUrl || ""}
                  </motion.code>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3 md:mt-0">
                <motion.button
                  onClick={onCopy}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  title="Copy short URL"
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl
                             bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200
                             hover:bg-gray-200 dark:hover:bg-gray-700
                             hover:shadow-lg hover:shadow-blue-200/20 cursor-pointer
                             focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                >
                  {copyStatus ? (
                    <ClipboardCheckIcon className="text-green-500" width={18} />
                  ) : (
                    <ClipboardIcon width={18} />
                  )}
                </motion.button>

                <Link
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  title="Open in new tab"
                  href={`/${preferredUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl
                             bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200
                             hover:bg-gray-200 dark:hover:bg-gray-700
                             hover:shadow-lg hover:shadow-blue-200/20
                             focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                >
                  <ArrowUpRight width={18} />
                </Link>
              </div>
            </div>

            <div className="mt-3 text-center">
              {copyStatus ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.18 }}
                  className="text-sm text-green-500"
                >
                  Copied to clipboard!
                </motion.span>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
