import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WhyChooseUs = () => {
  const canvasRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Real video reviews with embedded videos
  const videoReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "Beauty Vlog",
      videoThumbnail:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=400&fit=crop",
      review:
        "I was amazed by how quickly they turned around my weekly vlog. The editing was so professional and they perfectly captured my brand's aesthetic. The color grading made my footage look cinematic!",
      rating: 5,
      stats: "3x faster delivery than my previous editor",
      duration: "2:34",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Marketing Director",
      company: "TechStart Inc",
      videoThumbnail:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop",
      review:
        "Our product launch video needed to be perfect, and they delivered beyond expectations. The attention to detail in the motion graphics and sound design was exceptional. Our engagement rates skyrocketed!",
      rating: 5,
      stats: "215% increase in engagement",
      duration: "1:45",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Documentary Filmmaker",
      company: "Independent Films",
      videoThumbnail:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop",
      review:
        "As a documentary filmmaker, storytelling is everything. They understood my vision completely and helped me craft a narrative that moved my audience. The pacing and emotional impact were perfect.",
      rating: 5,
      stats: "Film festival selection",
      duration: "3:12",
    },
  ];

  // Dummy testimonials data for marquee
  const dummyTestimonials = [
    {
      id: 1,
      text: "Absolutely stunning work! The team transformed our raw footage into a cinematic masterpiece that exceeded all expectations.",
      author: "Sarah Johnson",
      role: "Content Creator",
      initials: "SJ",
      rating: 5,
      isBest: true,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      text: "Professional, fast, and incredibly talented. Our corporate video came out better than we ever imagined!",
      author: "Michael Chen",
      role: "Marketing Director",
      initials: "MC",
      rating: 5,
      isBest: false,
      createdAt: "2024-01-12",
    },
    {
      id: 3,
      text: "The attention to detail and creative vision brought our story to life in ways we couldn't have imagined.",
      author: "Emily Rodriguez",
      role: "Documentary Filmmaker",
      initials: "ER",
      rating: 5,
      isBest: true,
      createdAt: "2024-01-10",
    },
    {
      id: 4,
      text: "Outstanding color grading and seamless transitions. They truly understand cinematic storytelling.",
      author: "David Thompson",
      role: "YouTuber",
      initials: "DT",
      rating: 4,
      isBest: false,
      createdAt: "2024-01-08",
    },
    {
      id: 5,
      text: "Working with this team was a game-changer for our brand. The final product speaks for itself!",
      author: "Lisa Wang",
      role: "Brand Manager",
      initials: "LW",
      rating: 5,
      isBest: false,
      createdAt: "2024-01-05",
    },
    {
      id: 6,
      text: "Incredible turnaround time without compromising quality. Will definitely work with them again!",
      author: "Robert Martinez",
      role: "Event Coordinator",
      initials: "RM",
      rating: 5,
      isBest: true,
      createdAt: "2024-01-03",
    },
  ];

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setReviews(dummyTestimonials);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviews(dummyTestimonials);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Auto-advance video reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentReviewIndex((prev) => (prev + 1) % videoReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videoReviews.length]);

  // Navigation functions
  const nextReview = () => {
    setDirection(1);
    setCurrentReviewIndex((prev) => (prev + 1) % videoReviews.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setCurrentReviewIndex(
      (prev) => (prev - 1 + videoReviews.length) % videoReviews.length
    );
  };

  // Slide variants for smooth transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const slideTransition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  };

  // Process reviews data for display
  const processedReviews = reviews.map((review, index) => ({
    id: review._id || review.id || index,
    text: review.content || review.text,
    author: review.userName || review.author,
    role: review.user?.name || review.role || "Client",
    initials: (review.userName || review.author)
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    screenshot: review.screenshot,
    rating: review.rating || 5,
    isBest: review.isBest || false,
    createdAt: review.createdAt,
  }));

  // Split testimonials into three columns for marquee effect
  const column1 = processedReviews.slice(0, 2);
  const column2 = processedReviews.slice(2, 4);
  const column3 = processedReviews.slice(4, 6);

  // Double the testimonials for seamless looping in each column
  const doubledColumn1 = [...column1, ...column1];
  const doubledColumn2 = [...column2, ...column2];
  const doubledColumn3 = [...column3, ...column3];

  // Floating Orbs Component with more orbs
  const FloatingOrbs = () => {
    const orbs = [
      // Large primary orbs
      {
        id: 1,
        size: 120,
        color: "from-teal-200/40 to-teal-300/30",
        x: "10%",
        y: "20%",
        duration: 25,
        delay: 0,
      },
      {
        id: 2,
        size: 80,
        color: "from-emerald-200/30 to-teal-200/40",
        x: "85%",
        y: "70%",
        duration: 30,
        delay: 5,
      },
      {
        id: 3,
        size: 150,
        color: "from-cyan-200/20 to-teal-200/30",
        x: "70%",
        y: "15%",
        duration: 35,
        delay: 10,
      },
      {
        id: 4,
        size: 100,
        color: "from-teal-100/40 to-emerald-100/30",
        x: "15%",
        y: "80%",
        duration: 28,
        delay: 15,
      },
      {
        id: 5,
        size: 90,
        color: "from-cyan-100/30 to-teal-100/40",
        x: "50%",
        y: "40%",
        duration: 32,
        delay: 20,
      },
      {
        id: 6,
        size: 130,
        color: "from-teal-300/20 to-cyan-200/30",
        x: "90%",
        y: "30%",
        duration: 26,
        delay: 12,
      },
      // Additional medium orbs
      {
        id: 7,
        size: 70,
        color: "from-teal-100/50 to-cyan-100/40",
        x: "25%",
        y: "10%",
        duration: 22,
        delay: 8,
      },
      {
        id: 8,
        size: 85,
        color: "from-emerald-100/40 to-teal-200/50",
        x: "75%",
        y: "85%",
        duration: 29,
        delay: 18,
      },
      {
        id: 9,
        size: 95,
        color: "from-cyan-300/25 to-teal-300/35",
        x: "35%",
        y: "65%",
        duration: 31,
        delay: 25,
      },
      {
        id: 10,
        size: 65,
        color: "from-teal-200/45 to-emerald-200/35",
        x: "60%",
        y: "25%",
        duration: 27,
        delay: 14,
      },
      // Small accent orbs
      {
        id: 11,
        size: 45,
        color: "from-teal-300/60 to-cyan-300/50",
        x: "5%",
        y: "50%",
        duration: 20,
        delay: 3,
      },
      {
        id: 12,
        size: 55,
        color: "from-emerald-300/55 to-teal-400/45",
        x: "95%",
        y: "60%",
        duration: 24,
        delay: 7,
      },
      {
        id: 13,
        size: 40,
        color: "from-cyan-400/60 to-teal-500/50",
        x: "45%",
        y: "5%",
        duration: 18,
        delay: 11,
      },
      {
        id: 14,
        size: 50,
        color: "from-teal-400/50 to-emerald-400/60",
        x: "55%",
        y: "95%",
        duration: 23,
        delay: 16,
      },
      {
        id: 15,
        size: 60,
        color: "from-cyan-200/65 to-teal-300/55",
        x: "20%",
        y: "35%",
        duration: 26,
        delay: 22,
      },
      {
        id: 16,
        size: 35,
        color: "from-teal-500/40 to-cyan-500/60",
        x: "80%",
        y: "45%",
        duration: 19,
        delay: 9,
      },
      // Extra tiny orbs for depth
      {
        id: 17,
        size: 25,
        color: "from-teal-600/70 to-cyan-600/60",
        x: "30%",
        y: "75%",
        duration: 16,
        delay: 4,
      },
      {
        id: 18,
        size: 30,
        color: "from-emerald-500/65 to-teal-600/55",
        x: "65%",
        y: "55%",
        duration: 21,
        delay: 13,
      },
      {
        id: 19,
        size: 20,
        color: "from-cyan-600/70 to-teal-700/60",
        x: "85%",
        y: "15%",
        duration: 15,
        delay: 6,
      },
      {
        id: 20,
        size: 28,
        color: "from-teal-700/50 to-emerald-600/65",
        x: "40%",
        y: "90%",
        duration: 17,
        delay: 19,
      },
    ];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-xl`}
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
            }}
            animate={{
              y: [0, -30, 0, 20, 0],
              x: [0, 15, -10, 5, 0],
              scale: [1, 1.1, 0.95, 1.05, 1],
              rotate: [0, 5, -3, 2, 0],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Background grid animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawGrid = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines with teal color scheme
      ctx.strokeStyle = "rgba(13, 148, 136, 0.08)";
      ctx.lineWidth = 1;

      const cellSize = 50;
      const offsetX = (time * 0.01) % cellSize;
      const offsetY = (time * 0.01) % cellSize;

      // Vertical lines
      for (let x = offsetX; x < canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = offsetY; y < canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw pulsing gradient overlay with teal colors
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.8
      );

      const pulseIntensity = (Math.sin(time * 0.002) + 1) * 0.2;
      gradient.addColorStop(
        0,
        `rgba(13, 148, 136, ${0.02 + pulseIntensity * 0.02})`
      );
      gradient.addColorStop(
        0.5,
        `rgba(20, 184, 166, ${0.03 + pulseIntensity * 0.02})`
      );
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    animationFrameId = requestAnimationFrame(drawGrid);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Real Differentiators
  const differentiators = [
    {
      icon: "⏰",
      title: "24-48 Hour Delivery",
      description:
        "While others take 5-7 days, we deliver professional edits in 1-2 days without rushing or compromising quality.",
      metric: "Fastest",
      color: "from-green-500 to-teal-500",
      borderColor: "border-green-200",
      bgColor: "bg-gradient-to-br from-green-50 to-teal-50",
    },
    {
      icon: "💬",
      title: "Real-Time Collaboration",
      description:
        "Work directly with your editor via live chat and screen sharing. No more waiting days for email responses.",
      metric: "Live Editing",
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-200",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      icon: "🔄",
      title: "Unlimited Revisions",
      description:
        "Most editors charge extra for revisions. We include unlimited revisions until you're 100% satisfied.",
      metric: "No Extra Cost",
      color: "from-purple-500 to-indigo-500",
      borderColor: "border-purple-200",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
    },
    {
      icon: "🎵",
      title: "Copyright-Free Music",
      description:
        "We provide access to premium, copyright-free music libraries so your videos never get taken down.",
      metric: "Safe Music",
      color: "from-orange-500 to-amber-500",
      borderColor: "border-orange-200",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
    },
  ];

  // Real Comparison
  const comparisonData = [
    {
      aspect: "Delivery Time",
      you: "24-48 hours",
      others: "5-7 days",
      advantage: "3x Faster",
    },
    {
      aspect: "Communication",
      you: "Live chat & calls",
      others: "Email only",
      advantage: "Instant",
    },
    {
      aspect: "Revisions",
      you: "Unlimited & free",
      others: "2-3 max, extra $",
      advantage: "Better Value",
    },
    {
      aspect: "Music Rights",
      you: "Copyright-free library",
      others: "You provide music",
      advantage: "Worry-Free",
    },
  ];

  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "48h", label: "Avg. Delivery Time" },
  ];

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Testimonial Card Component for marquee
  const TestimonialCard = ({ testimonial }) => {
    return (
      <div
        className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 h-full shadow-lg ${
          testimonial.isBest
            ? "border-yellow-400/50 shadow-lg shadow-yellow-400/20"
            : "border-gray-200 hover:border-teal-300"
        }`}
      >
        {/* Featured Badge */}
        {testimonial.isBest && (
          <div className="flex items-center mb-3">
            <span className="bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium flex items-center">
              ⭐ Featured Review
            </span>
          </div>
        )}

        {/* Star Rating */}
        <StarRating rating={testimonial.rating} />

        {/* Review Text */}
        <div className="text-teal-500 text-4xl mb-4">"</div>
        <p className="text-gray-700 mb-4 line-clamp-4">{testimonial.text}</p>

        {/* Author Info */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold mr-3 border border-teal-200">
              {testimonial.initials}
            </div>
            <div>
              <div className="text-gray-900 font-medium">
                {testimonial.author}
              </div>
              <div className="text-gray-600 text-sm">{testimonial.role}</div>
            </div>
          </div>

          {/* Date */}
          {testimonial.createdAt && (
            <div className="text-gray-500 text-xs text-right">
              {new Date(testimonial.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Marquee Column Component
  const MarqueeColumn = ({ testimonials, direction = "down", speed = 40 }) => {
    return (
      <div className="relative h-[600px] overflow-hidden">
        {/* Gradient overlays for top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex flex-col space-y-6"
          animate={{
            y: direction === "down" ? [0, -600] : [-600, 0],
          }}
          transition={{
            y: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className="flex-shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  // Video Review Component with Slide Transitions
  const VideoReviewSection = () => {
    const currentReview = videoReviews[currentReviewIndex];

    return (
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Real Client Results
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            See how we've helped content creators and businesses achieve their
            goals with professional video editing
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Card Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-2xl overflow-hidden relative">
            {/* Navigation Buttons */}
            <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2 flex justify-between z-10">
              {/* Previous Button */}
              <button
                onClick={prevReview}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 border border-gray-200"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={nextReview}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 border border-gray-200"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
              {/* Video Section */}
              <div className="relative p-8 bg-gradient-to-br from-gray-50 to-white">
                {/* Video Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 lg:h-80 bg-gray-200">
                  {/* Animated Thumbnail with Slide Transition */}
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.img
                      key={currentReview.id}
                      src={currentReview.videoThumbnail}
                      alt="Video review thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    />
                  </AnimatePresence>

                  {/* Play Button */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>

                  {/* Video Duration */}
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {currentReview.duration}
                  </div>
                </div>

                {/* Client Info with Slide Transition */}
                <div className="mt-6 text-center h-24">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentReview.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    >
                      <h3 className="text-xl font-bold text-gray-900">
                        {currentReview.name}
                      </h3>
                      <p className="text-teal-600 font-medium">
                        {currentReview.role}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {currentReview.company}
                      </p>
                      <div className="mt-2 flex justify-center">
                        <StarRating rating={currentReview.rating} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Review Text Section */}
              <div className="p-8 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="text-teal-500 text-6xl mb-4">"</div>

                  {/* Review Text with Slide Transition */}
                  <div className="h-48 overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.p
                        key={currentReview.id}
                        className="text-gray-700 text-lg leading-relaxed"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={slideTransition}
                      >
                        {currentReview.review}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Stats Badge with Slide Transition */}
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentReview.stats}
                      className="bg-teal-50 inline-flex items-center px-4 py-2 rounded-full mt-4"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    >
                      <span className="text-teal-700 font-semibold text-sm">
                        🎯 {currentReview.stats}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Dots and Counter */}
                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center space-x-3">
                    {videoReviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const newDirection =
                            index > currentReviewIndex ? 1 : -1;
                          setDirection(newDirection);
                          setCurrentReviewIndex(index);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentReviewIndex
                            ? "bg-teal-500 scale-125"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="text-gray-500 text-sm">
                    {currentReviewIndex + 1} of {videoReviews.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex flex-col items-center justify-center py-20">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Color Orbs */}
      <FloatingOrbs />

      {/* Gradient overlays for teal effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50/20 to-white/60"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-teal-100/10 to-teal-50/10"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-teal-700 text-sm font-medium border border-teal-200 shadow-lg">
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
            <span className="text-teal-800">Why We're Different</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Video Editing That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400">
              Actually Delivers
            </span>
          </h1>

          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-medium mb-12">
            While other editors make promises, we deliver results. Faster
            turnaround, better communication, and features that actually matter
            to content creators.
          </p>

          {/* Differentiator Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                className={`relative p-6 rounded-2xl border-2 ${item.borderColor} ${item.bgColor} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Metric Badge */}
                <div
                  className={`absolute -top-3 -right-3 px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-bold shadow-lg`}
                >
                  {item.metric}
                </div>

                {/* Icon */}
                <div className="text-4xl mb-4">{item.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Comparison Section */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
              The Real Difference
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              See how we solve the biggest frustrations content creators face
              with other editors
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {comparisonData.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 hover:border-teal-200 transition-all duration-300"
                >
                  <div className="text-sm text-gray-500 mb-2 font-medium">
                    {item.aspect}
                  </div>

                  <div className="flex items-center justify-center space-x-4 mb-3">
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Others</div>
                      <div className="text-sm text-gray-600 line-through">
                        {item.others}
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                      <span className="text-white text-lg">→</span>
                    </div>

                    <div className="text-left">
                      <div className="text-xs text-teal-600 font-medium">
                        We Offer
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {item.you}
                      </div>
                    </div>
                  </div>

                  <div className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold">
                    {item.advantage}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/60 hover:border-teal-300 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Video Reviews Section with Slide Transitions */}
        <VideoReviewSection />

        {/* Testimonials Marquee Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            More Happy Clients
          </h2>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              <p className="text-gray-600 mt-4">Loading reviews...</p>
            </div>
          ) : (
            <>
              {/* Three Column Marquee Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative">
                  <MarqueeColumn
                    testimonials={doubledColumn1}
                    direction="down"
                    speed={45}
                  />
                </div>

                <div className="relative">
                  <MarqueeColumn
                    testimonials={doubledColumn2}
                    direction="up"
                    speed={50}
                  />
                </div>

                <div className="relative">
                  <MarqueeColumn
                    testimonials={doubledColumn3}
                    direction="down"
                    speed={40}
                  />
                </div>
              </div>

              {/* Reviews Summary */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Showing {processedReviews.length} verified review
                  {processedReviews.length !== 1 ? "s" : ""}
                </p>
              </div>
            </>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-white/90 backdrop-blur-sm p-10 rounded-2xl border border-teal-200 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tired of Slow Editors?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
            Experience video editing that actually respects your time and
            delivers professional results when you need them.
          </p>

          <button className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-medium rounded-full hover:scale-105 transition-transform duration-300 shadow-lg">
            Get Your Edit in 24 Hours
          </button>
        </motion.div>
      </div>

      {/* Scrolling text effect at bottom */}
      <div className="absolute bottom-10 left-0 right-0 mx-auto w-full max-w-5xl px-4 overflow-hidden">
        <div className="text-gray-400 text-xs md:text-sm font-mono whitespace-nowrap">
          • FAST TURNAROUND • UNLIMITED REVISIONS • LIVE COLLABORATION •
          COPYRIGHT-FREE MUSIC • • 24/7 SUPPORT • PROFESSIONAL QUALITY • QUICK
          DELIVERY • PREMIUM EDITING •
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
