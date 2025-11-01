import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getVideoReelsByCategory } from "../../services/api";
import BookingModal from "../BookingModal";
import * as THREE from "three";

const HeroSection = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);
  const mountRef = useRef(null);
  const heroRef = useRef(null);

  const [videoPlaying, setVideoPlaying] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [introductionVideo, setIntroductionVideo] = useState(null);
  const [loadingIntroduction, setLoadingIntroduction] = useState(true);

  // Video player states
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showCentralButton, setShowCentralButton] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [controlsTimeout, setControlsTimeout] = useState(null);

  // Three.js animation state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Fetch introduction video
  useEffect(() => {
    const fetchIntroductionVideo = async () => {
      try {
        setLoadingIntroduction(true);
        const response = await getVideoReelsByCategory("introduction");

        if (
          response.status === "success" &&
          response.data.videoReels.length > 0
        ) {
          const introVideo = response.data.videoReels[0];
          setIntroductionVideo(introVideo);
        } else {
          console.warn("No introduction videos found");
        }
      } catch (error) {
        console.error("Error fetching introduction video:", error);
      } finally {
        setLoadingIntroduction(false);
      }
    };

    fetchIntroductionVideo();
  }, []);

  // Three.js Holographic Tunnel Background
  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    camera.position.z = 15;

    // Create holographic tunnel with proper wave layers
    const tunnelGroup = new THREE.Group();
    scene.add(tunnelGroup);

    // Create wave-like tunnel layers
    const layers = [];
    const layerCount = 40;
    const layerSpacing = 1.5;

    for (let i = 0; i < layerCount; i++) {
      // Create wave-shaped geometry
      const points = [];
      const segments = 64;
      const baseRadius = 8;
      const waveAmplitude = 2;

      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        const wave1 = Math.sin(angle * 4) * waveAmplitude;
        const wave2 = Math.cos(angle * 3 + i * 0.3) * waveAmplitude * 0.5;
        const wave3 = Math.sin(angle * 6 + i * 0.5) * waveAmplitude * 0.3;

        const radius = baseRadius + wave1 + wave2 + wave3;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          )
        );
      }

      const layerGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const layerMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0x008081),
        transparent: true,
        opacity: 0.15 - (i / layerCount) * 0.12,
        linewidth: 1,
      });

      const layer = new THREE.LineLoop(layerGeometry, layerMaterial);
      layer.position.z = -i * layerSpacing;
      layer.rotation.x = Math.PI / 2;
      tunnelGroup.add(layer);
      layers.push({
        mesh: layer,
        baseZ: -i * layerSpacing,
        phase: i * 0.2,
        speed: 0.1 + (i / layerCount) * 0.2,
      });
    }

    // Create data stream particles that follow wave pattern
    const streamCount = 12;
    const streams = [];

    for (let i = 0; i < streamCount; i++) {
      const streamParticles = new THREE.BufferGeometry();
      const particleCount = 80;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const baseAngle = (i / streamCount) * Math.PI * 2;
      const baseRadius = 7;

      for (let j = 0; j < particleCount; j++) {
        const j3 = j * 3;
        const progress = j / particleCount;

        const angle = baseAngle + progress * Math.PI * 3;
        const waveOffset = Math.sin(angle * 4 + progress * Math.PI * 2) * 1.5;
        const radius = baseRadius + waveOffset;

        positions[j3] = Math.cos(angle) * radius;
        positions[j3 + 1] = Math.sin(angle) * radius;
        positions[j3 + 2] = -progress * 60;

        const intensity = 0.5 + Math.random() * 0.4;
        colors[j3] = 0.1;
        colors[j3 + 1] = intensity;
        colors[j3 + 2] = intensity * 0.9;
      }

      streamParticles.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      streamParticles.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );

      const streamMaterial = new THREE.PointsMaterial({
        size: 1.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const stream = new THREE.Points(streamParticles, streamMaterial);
      scene.add(stream);
      streams.push({
        mesh: stream,
        speed: 0.15 + Math.random() * 0.2,
        offset: Math.random() * 100,
        baseAngle: baseAngle,
      });
    }

    // Create floating hexagons with wave-like motion
    const hexagons = [];
    const hexagonCount = 20;

    for (let i = 0; i < hexagonCount; i++) {
      const hexGeometry = new THREE.CircleGeometry(
        0.3 + Math.random() * 0.4,
        6
      );
      const hexMaterial = new THREE.MeshBasicMaterial({
        color: 0x008081,
        transparent: true,
        opacity: 0.2 + Math.random() * 0.2,
        side: THREE.DoubleSide,
      });

      const hexagon = new THREE.Mesh(hexGeometry, hexMaterial);

      const angle = (i / hexagonCount) * Math.PI * 2;
      const radius = 5 + Math.random() * 3;

      hexagon.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 15
      );

      hexagon.rotation.x = Math.random() * Math.PI;
      hexagon.rotation.y = Math.random() * Math.PI;

      scene.add(hexagon);
      hexagons.push({
        mesh: hexagon,
        basePosition: hexagon.position.clone(),
        baseAngle: angle,
        radius: radius,
        floatSpeed: 0.2 + Math.random() * 0.3,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
        wavePhase: Math.random() * Math.PI * 2,
      });
    }

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Animate wave layers
      layers.forEach((layer, index) => {
        const layerTime = elapsedTime * layer.speed + layer.phase;

        const positions = layer.mesh.geometry.attributes.position.array;
        const baseRadius = 8;
        const waveAmplitude = 1.5;

        for (let j = 0; j < positions.length / 3; j++) {
          const j3 = j * 3;
          const angle = (j / (positions.length / 3)) * Math.PI * 2;

          const wave1 = Math.sin(angle * 4 + layerTime * 2) * waveAmplitude;
          const wave2 =
            Math.cos(angle * 3 + layerTime * 1.5) * waveAmplitude * 0.6;
          const wave3 = Math.sin(angle * 6 + layerTime) * waveAmplitude * 0.3;

          const radius = baseRadius + wave1 + wave2 + wave3;

          positions[j3] = Math.cos(angle) * radius;
          positions[j3 + 1] = Math.sin(angle) * radius;
        }

        layer.mesh.geometry.attributes.position.needsUpdate = true;
        layer.mesh.rotation.z += 0.001;
        layer.mesh.position.z = layer.baseZ + elapsedTime * 0.3;
        if (layer.mesh.position.z > 10) {
          layer.mesh.position.z = -60;
        }
      });

      // Animate data streams
      streams.forEach((stream, index) => {
        const positions = stream.mesh.geometry.attributes.position.array;
        const streamTime = elapsedTime * stream.speed + stream.offset;

        for (let i = 0; i < positions.length; i += 3) {
          const progress = i / 3 / (positions.length / 3);
          const angle = stream.baseAngle + progress * Math.PI * 2;

          const waveOffset = Math.sin(angle * 4 + streamTime * 3) * 2;
          const radius = 7 + waveOffset;

          positions[i] = Math.cos(angle) * radius;
          positions[i + 1] = Math.sin(angle) * radius;
          positions[i + 2] += 0.15;

          if (positions[i + 2] > 10) {
            positions[i + 2] = -60;
          }
        }

        stream.mesh.geometry.attributes.position.needsUpdate = true;
      });

      // Animate floating hexagons
      hexagons.forEach((hex, index) => {
        const hexTime = elapsedTime * hex.floatSpeed + hex.wavePhase;

        const orbitAngle = hex.baseAngle + hexTime * 0.5;
        const waveRadius = hex.radius + Math.sin(hexTime * 2) * 0.8;

        hex.mesh.position.x = Math.cos(orbitAngle) * waveRadius;
        hex.mesh.position.y = Math.sin(orbitAngle) * waveRadius;
        hex.mesh.position.z = hex.basePosition.z + Math.sin(hexTime * 1.7) * 2;

        hex.mesh.rotation.x += hex.rotationSpeed + Math.sin(hexTime) * 0.002;
        hex.mesh.rotation.y +=
          hex.rotationSpeed * 0.7 + Math.cos(hexTime) * 0.001;

        const dx = hex.mesh.position.x - mouse.x * 8;
        const dy = hex.mesh.position.y - mouse.y * 8;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 4) {
          const force = (4 - distance) * 0.008;
          const waveForce = Math.sin(elapsedTime * 5) * force * 0.3;
          hex.mesh.position.x += (dx / distance) * force + waveForce;
          hex.mesh.position.y += (dy / distance) * force + waveForce;
        }
      });

      tunnelGroup.rotation.y = elapsedTime * 0.03;
      tunnelGroup.rotation.x = Math.sin(elapsedTime * 0.08) * 0.1;
      tunnelGroup.rotation.z = Math.sin(elapsedTime * 0.05) * 0.05;

      camera.position.x = Math.sin(elapsedTime * 0.08) * 0.8;
      camera.position.y = Math.cos(elapsedTime * 0.06) * 0.6;
      camera.position.z = 15 + Math.sin(elapsedTime * 0.1) * 0.3;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Text animation
  useEffect(() => {
    setTimeout(() => {
      const animatedElements = document.querySelectorAll(".animate-on-scroll");
      animatedElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-8");
        }, index * 300);
      });
    }, 500);
  }, []);

  // Video event handlers and controls
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleWaiting = () => setLoadingVideo(true);
    const handlePlaying = () => setLoadingVideo(false);

    const handleEnded = () => {
      setVideoPlaying(false);
      setVideoEnded(true);
      setShowCentralButton(true);
      setIsVideoPlaying(false);
    };

    const handlePlay = () => {
      setVideoPlaying(true);
      setVideoEnded(false);
      setShowCentralButton(false);
      setIsVideoPlaying(true);
    };

    const handlePause = () => {
      setVideoPlaying(false);
      setIsVideoPlaying(false);
      if (!videoEnded) {
        setShowCentralButton(true);
      }
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("canplay", updateDuration);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Set initial volume and start paused
    video.volume = volume;
    video.muted = isMuted;
    video.pause();

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("canplay", updateDuration);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [introductionVideo, volume, isMuted, videoEnded]);

  // Controls auto-hide
  useEffect(() => {
    if (showControls && videoPlaying) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setControlsTimeout(timeout);

      return () => clearTimeout(timeout);
    }
  }, [showControls, videoPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.play();
        setShowCentralButton(false);
        setVideoEnded(false);
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setShowCentralButton(true);
        setIsVideoPlaying(false);
      }
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setShowCentralButton(false);
      setVideoEnded(false);
      setIsVideoPlaying(true);
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;

    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;

    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    if (!videoRef.current) return;

    const volumeBar = volumeBarRef.current;
    const rect = volumeBar.getBoundingClientRect();
    let newVolume = (e.clientX - rect.left) / rect.width;
    newVolume = Math.max(0, Math.min(1, newVolume));

    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];

    setPlaybackRate(newRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = newRate;
    }
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current?.parentElement;
    if (!videoContainer) return;

    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleVideoHover = (isHovering) => {
    if (videoRef.current && isHovering && videoPlaying) {
      videoRef.current.playbackRate = 1.2;
    } else if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }
  };

  // Modal handlers
  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  // Projects navigation handler
  const navigateToProjects = () => {
    window.location.href = "/projects";
  };

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Determine video source and poster
  const videoSource =
    introductionVideo?.videoUrl ||
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const videoPoster =
    introductionVideo?.thumbnailUrl ||
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
  const videoTitle = introductionVideo?.title
    ? `${introductionVideo.title}.MP4`
    : "INTRODUCTION_2025.MP4";

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-gray-50 to-teal-50 flex flex-col items-center justify-center pt-20 pb-10"
    >
      {/* Three.js Holographic Tunnel Background */}
      <div
        ref={mountRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-50 to-teal-50 opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent opacity-70"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 md:px-8 max-w-6xl mx-auto mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated badge */}
        <motion.div
          className="inline-flex items-center space-x-2 mb-8 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium border border-teal-100 shadow-sm animate-on-scroll opacity-0 translate-y-8"
          variants={itemVariants}
        >
          <span
            className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"
            style={{ animationDuration: "2s" }}
          ></span>
          <span>Next Generation Video Editing</span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl mx-auto leading-tight animate-on-scroll opacity-0 translate-y-8"
          variants={itemVariants}
        >
          <span className="text-gray-800">Visual Stories</span>
          <br />
          <span className="text-teal-600">Reimagined</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed animate-on-scroll opacity-0 translate-y-8"
          variants={itemVariants}
        >
          Transform your vision into captivating visual experiences with our
          AI-powered editing platform. Where creativity meets cutting-edge
          technology.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-on-scroll opacity-0 translate-y-8"
          variants={itemVariants}
        >
          <motion.button
            className="bg-teal-600 text-white px-8 py-4 rounded-full hover:bg-teal-700 transition-all duration-500 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateToProjects}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Portfolio
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </motion.button>

          <motion.button
            className="border border-teal-200 text-teal-700 px-8 py-4 rounded-full hover:border-teal-400 hover:bg-teal-50 transition-all duration-500 font-medium transform hover:-translate-y-1 flex items-center justify-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openBookingModal}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Project
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modern Video Player Section */}
      <motion.div
        className="relative z-10 w-full max-w-6xl px-4 mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-gray-100">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 font-medium">
              Experience Our Creative Process
            </p>
          </div>
        </div>

        <div
          className="w-full h-[500px] lg:h-[600px] relative overflow-hidden rounded-3xl border-2 border-white shadow-2xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 group bg-white"
          onMouseEnter={() => {
            handleVideoHover(true);
            setShowControls(true);
          }}
          onMouseLeave={() => handleVideoHover(false)}
          onMouseMove={handleMouseMove}
        >
          {loadingIntroduction ? (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl flex items-center justify-center z-30">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                </div>
                <p className="text-blue-600 font-medium mt-4">
                  Loading creative showcase...
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Video element */}
              <video
                ref={videoRef}
                muted={isMuted}
                loop={false}
                playsInline
                className="w-full h-full object-cover"
                poster={videoPoster}
                onClick={handlePlayPause}
              >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Modern gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none z-10"></div>
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/40 to-transparent pointer-events-none z-10"></div>

              {/* Video title with modern design */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-semibold z-20 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-800">▶ {videoTitle}</span>
                </div>
              </div>

              {/* Loading indicator */}
              {loadingVideo && (
                <div className="absolute inset-0 flex items-center justify-center z-15 bg-white/20 backdrop-blur-sm">
                  <div className="bg-white/90 rounded-2xl px-6 py-4 shadow-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="text-gray-700 font-medium">
                        Buffering...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Modern Central Play/Replay Button */}
              {(showCentralButton || !videoPlaying) && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Main button */}
                    <div
                      className="relative w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm border border-gray-200 hover:border-blue-300 transition-colors"
                      onClick={videoEnded ? handleReplay : handlePlayPause}
                    >
                      {/* Icon */}
                      {videoEnded ? (
                        <motion.svg
                          className="w-8 h-8 text-gray-700"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          initial={{ rotate: -180 }}
                          animate={{ rotate: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          className="w-8 h-8 text-gray-700"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Modern Video Controls */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 via-white/80 to-transparent p-6 z-20 transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
                onMouseEnter={() => setShowControls(true)}
              >
                {/* Progress Bar */}
                <div
                  ref={progressBarRef}
                  className="w-full h-2 bg-gray-200 rounded-full mb-4 cursor-pointer relative group/progress"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative"
                    style={{
                      width: `${
                        duration ? (currentTime / duration) * 100 : 0
                      }%`,
                    }}
                  >
                    <div className="absolute right-0 top-1/2 w-4 h-4 bg-white rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover/progress:opacity-100 shadow-lg border border-gray-300"></div>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Play/Pause */}
                    <motion.button
                      onClick={handlePlayPause}
                      className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg border border-gray-200 hover:border-blue-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {videoPlaying ? (
                        <svg
                          className="w-5 h-5 text-gray-700"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-gray-700"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </motion.button>

                    {/* Volume Control */}
                    <div className="flex items-center space-x-3">
                      <motion.button
                        onClick={toggleMute}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isMuted || volume === 0 ? (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : volume > 0.5 ? (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </motion.button>

                      <div
                        ref={volumeBarRef}
                        className="w-20 h-1 bg-gray-300 rounded-full cursor-pointer relative group/volume"
                        onClick={handleVolumeChange}
                      >
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                        >
                          <div className="absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover/volume:opacity-100 shadow border border-gray-300"></div>
                        </div>
                      </div>
                    </div>

                    {/* Time Display */}
                    <div className="text-gray-600 text-sm font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Playback Speed */}
                    <motion.button
                      onClick={changePlaybackRate}
                      className="px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium bg-white rounded-lg border border-gray-200 hover:border-blue-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {playbackRate}x
                    </motion.button>

                    {/* Fullscreen */}
                    <motion.button
                      onClick={toggleFullscreen}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isFullscreen ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 11.414V14a1 1 0 01-2 0v-4zm9-1a1 1 0 110 2h-4a1 1 0 110-2h4zm2 6a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L13 12.586V10a1 1 0 112 0v4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V9a1 1 0 01-2 0V3zm9 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12a1 1 0 01-1-1zm-9 9a1 1 0 012 0v2.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H9a1 1 0 110 2H3a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h2.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V11a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Stats section */}
      <div className="flex justify-center mt-8 mb-16"></div>

      {/* Modern scrolling tech stack */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 mx-auto w-full max-w-6xl px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: [0, -800] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[
              "4K RESOLUTION",
              "COLOR GRADING",
              "MOTION GRAPHICS",
              "VISUAL EFFECTS",
              "SOUND DESIGN",
              "AI ENHANCEMENT",
              "DRONE FOOTAGE",
              "CINEMATIC EDITING",
              "3D ANIMATION",
              "VR CONTENT",
            ].map((tech, index) => (
              <div key={index} className="flex items-center gap-12">
                <span className="text-gray-600 font-semibold text-sm whitespace-nowrap">
                  {tech}
                </span>
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />

      {/* Animation styles */}
      <style jsx>{`
        .animate-on-scroll {
          transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-on-scroll.opacity-100.translate-y-0 {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
