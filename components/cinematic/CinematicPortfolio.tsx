"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import {
	Home,
	Briefcase,
	Clock,
	Cpu,
	Mail,
	ArrowRight,
	ArrowUpRight,
	ChevronDown,
	Github,
	Linkedin,
	Layers,
	Server,
	BrainCircuit,
	Wrench,
	User,
} from "lucide-react";
import styles from "./CinematicPortfolio.module.css";
import GlassSurface from "./GlassSurface";
import { CinematicLoader } from "@/components/ui/CinematicLoader";

const VIDEO_DURATION = 20; // seconds
const VIDEO_SRC =
	"/Digital_Universe_Zoom_A_person_walks_through_a_dimly_lit_forest_the_IwGrB6gO.mp4";

// Seek threshold: 0.03s prevents micro-seeks that thrash the decoder while maintaining high visual framerate
const SEEK_THRESHOLD = 0.02;
const SEEK_TIMEOUT_MS = 900;

function getBufferedEnd(video: HTMLVideoElement): number {
	const { buffered } = video;
	if (!buffered || buffered.length === 0) return 0;

	for (let i = 0; i < buffered.length; i += 1) {
		const start = buffered.start(i);
		const end = buffered.end(i);
		if (video.currentTime >= start && video.currentTime <= end) {
			return end;
		}
	}

	return buffered.end(buffered.length - 1);
}

export default function CinematicPortfolio() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

	// RAF handle
	const rafRef = useRef<number | null>(null);

	// State flags
	const isReadyRef = useRef(false);
	// One seek at a time — prevents decoder thrashing on rapid scroll.
	const isPendingSeekRef = useRef(false);
	const seekStartedAtRef = useRef(0);
	const lastDrawnTimeRef = useRef(-1);

	// Time tracking
	const targetTimeRef = useRef(0);
	const lerpedTimeRef = useRef(0);

	// UI refs
	const preloaderRef = useRef<HTMLDivElement>(null);
	const progressFillRef = useRef<HTMLDivElement>(null);
	const sectionInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

	// ─── Object-fit cover ──────────────────────────────────────────────────────
	const drawCover = useCallback(() => {
		const canvas = canvasRef.current;
		const video = videoRef.current;
		const ctx = ctxRef.current;
		if (!canvas || !video || !ctx) return;
		if (video.readyState < 2) return;

		const cw = canvas.width;
		const ch = canvas.height;
		const vw = video.videoWidth || 1920;
		const vh = video.videoHeight || 1080;
		const canvasRatio = cw / ch;
		const videoRatio = vw / vh;

		let dw: number, dh: number, dx: number, dy: number;
		if (canvasRatio > videoRatio) {
			dw = cw;
			dh = cw / videoRatio;
			dx = 0;
			dy = (ch - dh) / 2;
		} else {
			dh = ch;
			dw = ch * videoRatio;
			dx = (cw - dw) / 2;
			dy = 0;
		}

		ctx.drawImage(video, dx, dy, dw, dh);
	}, []);

	// ─── Resize canvas ─────────────────────────────────────────────────────────
	const resizeCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		drawCover();
	}, [drawCover]);

	// ─── Scroll → only update TARGET time ──────────────────────────────────────
	const handleScroll = useCallback(() => {
		const scrollable =
			document.documentElement.scrollHeight - window.innerHeight;
		if (scrollable <= 0) return;
		const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
		targetTimeRef.current = progress * VIDEO_DURATION;

		// Update progress bar
		if (progressFillRef.current) {
			progressFillRef.current.style.width = `${progress * 100}%`;
		}
	}, []);

	// ─── RAF loop ─────────────────────────────────────────────────────────
	const rafLoop = useCallback(() => {
		const video = videoRef.current;

		if (isReadyRef.current && video) {
			// Lower lerp (0.04) creates a "weighty", ultra-smooth cinematic feel
			// and gives the H.264 decoder time to keep up without skipping massive frame gaps.
			const lerped =
				lerpedTimeRef.current +
				(targetTimeRef.current - lerpedTimeRef.current) * 0.04;
			lerpedTimeRef.current = lerped;
			const clamped = Math.max(0, Math.min(lerped, VIDEO_DURATION));
			const bufferedEnd = getBufferedEnd(video);
			const safeSeekTarget = Math.max(0, Math.min(clamped, bufferedEnd - 0.08));

			if (
				isPendingSeekRef.current &&
				performance.now() - seekStartedAtRef.current > SEEK_TIMEOUT_MS
			) {
				isPendingSeekRef.current = false;
			}

			if (
				!isPendingSeekRef.current &&
				Math.abs(video.currentTime - safeSeekTarget) > SEEK_THRESHOLD
			) {
				isPendingSeekRef.current = true;
				seekStartedAtRef.current = performance.now();
				video.currentTime = safeSeekTarget;
			}

			const timeDelta = Math.abs(video.currentTime - lastDrawnTimeRef.current);
			if (timeDelta > 0.01) {
				drawCover();
				lastDrawnTimeRef.current = video.currentTime;
			}
		}

		rafRef.current = requestAnimationFrame(rafLoop);
	}, [drawCover]);

	// ─── Main setup ───────────────────────────────────────────────────────────
	useEffect(() => {
		const video = videoRef.current;
		const canvas = canvasRef.current;
		if (!video || !canvas) return;

		ctxRef.current = canvas.getContext("2d", {
			alpha: false,
			desynchronized: true,
		});

		resizeCanvas();

		// Initialize smooth scrolling
		const lenis = new Lenis({
			autoRaf: true,
			lerp: 0.06,
			smoothWheel: true,
		});

		const prefersReduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const onSeeked = () => {
			drawCover();
			lastDrawnTimeRef.current = video.currentTime;
			isPendingSeekRef.current = false;
		};

		const onSeekRecover = () => {
			isPendingSeekRef.current = false;
		};

		const onCanPlayThrough = () => {
			isReadyRef.current = true;
			drawCover();
			const pl = preloaderRef.current;
			if (pl) {
				pl.style.opacity = "0";
				pl.style.pointerEvents = "none";
				setTimeout(() => {
					if (pl) pl.style.display = "none";
				}, 750);
			}
		};

		video.addEventListener("seeked", onSeeked);
		video.addEventListener("stalled", onSeekRecover);
		video.addEventListener("waiting", onSeekRecover);
		video.addEventListener("error", onSeekRecover);
		video.addEventListener("canplay", onCanPlayThrough, { once: true });

		if (video.readyState >= 3) {
			onCanPlayThrough();
		}

		if (prefersReduced) {
			onCanPlayThrough();
		}

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", resizeCanvas, { passive: true });

		if (!prefersReduced) {
			rafRef.current = requestAnimationFrame(rafLoop);
		}

		return () => {
			lenis.destroy();
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
			video.removeEventListener("seeked", onSeeked);
			video.removeEventListener("stalled", onSeekRecover);
			video.removeEventListener("waiting", onSeekRecover);
			video.removeEventListener("error", onSeekRecover);
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", resizeCanvas);
		};
	}, [drawCover, resizeCanvas, handleScroll, rafLoop]);

	// ─── IntersectionObserver: text reveal ────────────────────────────────────
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						(entry.target as HTMLElement).classList.add(styles.visible);
					}
				});
			},
			{ threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
		);

		sectionInnerRefs.current.forEach((el) => {
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<div
			className={`${styles.root} text-white overflow-x-hidden antialiased font-body-md selection:bg-primary-container/30`}
		>
			{/* ── Preloader ─────────────────────────────────────────────────────── */}
			<div
				className={styles.preloader}
				ref={preloaderRef}
				role="status"
				aria-label="Loading cinematic experience"
			>
        <CinematicLoader />
			</div>

			{/* ── Hidden video (frame source — never plays, only seeks) ─────────── */}
			<video
				ref={videoRef}
				src={VIDEO_SRC}
				muted
				playsInline
				preload="auto"
				className={styles.hiddenVideo}
				aria-hidden="true"
				tabIndex={-1}
			/>

			{/* ── Canvas (fixed, GPU-painted) ───────────────────────────────────── */}
			<canvas
				ref={canvasRef}
				className={styles.canvas}
				aria-hidden="true"
				role="presentation"
			/>

			{/* ── TopNavBar (Modular Desktop & Mobile Logo) ────────────────────── */}
			<div
				className={`fixed top-4 md:top-6 inset-x-0 mx-auto w-max z-[50] flex justify-center items-center pointer-events-none`}
			>
				{/* Single Pill Container for Navigation */}
				<div className="hidden md:flex pointer-events-auto h-14 items-stretch">
					<GlassSurface
						width="100%"
						height="100%"
						borderRadius={32}
						displace={0.3}
						opacity={0.6}
						blur={16}
						className="px-1 flex items-center shadow-2xl border border-white/10"
					>
						<div className="flex items-center gap-6 px-4 h-full relative z-10">
							{/* Logo integrated into the pill */}
							<div className="font-headline-md text-xl md:text-2xl text-white tracking-tight mr-4">
								SR
							</div>

							<nav className="flex items-center justify-center gap-1">
								{[
									{ id: "hero", label: "Hero" },
									{ id: "about", label: "About" },
									{ id: "projects", label: "Work" },
									{ id: "experience", label: "Journey" },
									{ id: "skills", label: "Stack" },
								].map((item) => (
									<a
										key={item.id}
										href={`#${item.id}`}
										className="group relative flex items-center justify-center px-4 py-2 rounded-full font-caption font-medium text-[11px] tracking-widest uppercase text-white/70 hover:text-white transition-all duration-300"
									>
										<span className="absolute inset-0 bg-white/10 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out"></span>
										<span className="relative z-10">{item.label}</span>
									</a>
								))}
							</nav>

							<div className="w-[1px] h-4 bg-white/20 mx-2"></div>

							{/* Contact integrated into the pill */}
							<a
								className={`inline-flex bg-primary/20 hover:bg-primary/40 border border-primary/30 text-white px-5 py-2 rounded-full font-caption font-medium uppercase tracking-wider items-center gap-2 transition-transform duration-300 hover:scale-105 active:scale-95`}
								href="#contact"
							>
								<span>Contact</span>
								<Mail className="w-4 h-4" />
							</a>
						</div>
					</GlassSurface>
				</div>

				{/* Mobile View: Logo Only (Links handled by bottom dock) */}
				<div className="md:hidden pointer-events-auto h-12 w-12 flex items-stretch">
					<GlassSurface
						width="100%"
						height="100%"
						borderRadius={20}
						displace={0.3}
						opacity={0.6}
						blur={16}
					>
						<div className="flex items-center justify-center w-full h-full relative z-10">
							<div className="font-headline-md text-xl text-white tracking-tight mt-1">
								SR
							</div>
						</div>
					</GlassSurface>
				</div>
			</div>

			{/* ── Mobile Bottom Dock ───────────────────────────────────────────── */}
			<div className="md:hidden fixed bottom-6 inset-x-0 mx-auto w-max max-w-[90%] z-[50] pointer-events-auto">
				<GlassSurface
					width="auto"
					height="100%"
					borderRadius={32}
					displace={0.5}
					opacity={0.75}
					blur={24}
				>
					<nav className="flex items-center justify-center gap-2 px-3 py-2 relative z-10">
						{[
							{ id: "hero", label: "Home", Icon: Home },
							{ id: "projects", label: "Work", Icon: Briefcase },
							{ id: "experience", label: "Journey", Icon: Clock },
							{ id: "skills", label: "Stack", Icon: Cpu },
						].map((item) => (
							<a
								key={item.id}
								aria-label={item.label}
								href={`#${item.id}`}
								className="group relative flex flex-col items-center justify-center w-14 h-14 rounded-[24px] text-white/80 hover:text-primary transition-colors active:scale-95 duration-200"
							>
								<div className="absolute inset-0 bg-primary/10 rounded-[20px] scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-active:scale-95 transition-all duration-300 ease-out"></div>
								<item.Icon className="w-6 h-6 relative z-10 group-hover:-translate-y-2 group-active:-translate-y-1 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
								<span className="absolute bottom-1.5 font-caption text-[9px] tracking-wider uppercase opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-out text-primary font-bold">
									{item.label}
								</span>
							</a>
						))}
					</nav>
				</GlassSurface>
			</div>

			<main className="relative z-[10] w-full">
				{/* ── Hero Section ─────────────────────────────────────────────────── */}
				<section
					className="h-[100vh] min-h-[800px] flex flex-col items-center justify-center relative px-4 md:px-20"
					id="hero"
				>
					<div
						className={`absolute inset-0 ${styles.meshGradient1} animate-blob w-full h-full pointer-events-none opacity-60`}
					></div>
					<div
						className={`absolute inset-0 ${styles.meshGradient2} animate-blob animation-delay-2000 w-full h-full pointer-events-none opacity-60`}
					></div>
					<div
						className="z-10 text-center max-w-5xl mt-20"
						ref={(el) => {
							sectionInnerRefs.current[0] = el;
						}}
					>
						<p className="font-code text-code text-primary mb-6 tracking-[0.2em] uppercase opacity-80">
							Full-Stack Engineer · React · FastAPI · PostgreSQL
						</p>
						<h1 className="font-headline-xl text-5xl md:text-8xl text-white mb-8 leading-[0.9] italic">
							Sarthak <br />{" "}
							<span className="not-italic opacity-90">Routray.</span>
						</h1>
						<p className="font-body-lg text-base md:text-lg text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
							Full-stack engineer shipping production systems with real-time ML
							pipelines and Dockerized delivery. Led 8-team codebases with 291
							commits; deployments served thousands of students across MUJ
							flagship festivals. Open to SWE roles in product-focused teams.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
							<a
								className={`${styles.btnPremium} text-primary px-8 py-4 rounded-full font-body-md hover:text-white flex items-center gap-3 group`}
								href="#projects"
							>
								View Work{" "}
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</a>
							<a
								className={`border border-white/20 hover:border-white/50 bg-black/20 backdrop-blur-sm text-white/90 px-8 py-4 rounded-full font-body-md hover:text-white flex items-center gap-3 group transition-all`}
								href="/Sarthak Routray CV.pdf"
								target="_blank"
								rel="noreferrer"
							>
								Resume{" "}
								<ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
							</a>
							<a
								className={`border border-white/20 hover:border-white/50 bg-black/20 backdrop-blur-sm text-white/90 px-8 py-4 rounded-full font-body-md hover:text-white flex items-center gap-3 group transition-all`}
								href="https://github.com/sarthakroutray"
								target="_blank"
								rel="noreferrer"
							>
								GitHub{" "}
								<Github className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
							</a>
						</div>
					</div>
					<div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80/40 animate-pulse">
						<ChevronDown className="w-6 h-6" />
					</div>
				</section>

				{/* ── Overview Section ─────────────────────────────────────────────── */}
				<section
					className="min-h-[60vh] flex flex-col justify-center relative px-4 md:px-20 py-20"
					id="about"
				>
					<div
						className="max-w-6xl mx-auto z-10 w-full"
						ref={(el) => {
							sectionInnerRefs.current[5] = el;
						}}
					>
						<GlassSurface
							width="100%"
							height="100%"
							borderRadius={32}
							displace={0.3}
							opacity={0.4}
							blur={24}
						>
							<div className="p-8 md:p-16 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
								<div className="lg:w-1/3">
									<h2 className="font-headline-lg text-4xl md:text-5xl text-white italic mb-4">
										Overview
									</h2>
									<div className="w-16 h-1 bg-primary mb-6 rounded-full opacity-80"></div>
									<p className="font-code text-sm text-primary uppercase tracking-widest opacity-80 mb-2">
										About Me
									</p>
								</div>
								<div className="lg:w-2/3 flex flex-col gap-6">
									<p className="font-body-lg text-base md:text-lg text-white/80 font-light leading-relaxed">
										Full-stack engineer (React, FastAPI, PostgreSQL) with live
										production deployments serving thousands of students across
										MUJ flagship festivals. I ship Dockerized, well-tested
										systems integrating real-time ML pipelines and have led an
										8-team codebase with 291 commits as a first-year
										undergraduate.
									</p>
									<p className="font-body-lg text-base md:text-lg text-white/80 font-light leading-relaxed">
										I focus on product-grade engineering, resilient backend
										systems, and clean, cinematic UI. Open to SWE roles in
										product-focused teams.
									</p>
									<div className="flex flex-wrap gap-4 mt-4">
										<a
											className="text-white hover:text-primary transition-colors flex items-center gap-2 font-code text-sm border-b border-white/20 pb-1 hover:border-primary"
											href="mailto:sarthak.routray2006@gmail.com"
										>
											<Mail className="w-4 h-4" /> sarthak.routray2006@gmail.com
										</a>
										<a
											className="text-white hover:text-primary transition-colors flex items-center gap-2 font-code text-sm border-b border-white/20 pb-1 hover:border-primary"
											href="tel:+919819362168"
										>
											<span className="text-white/80">+91</span> 9819362168
										</a>
										<a
											className="text-white hover:text-primary transition-colors flex items-center gap-2 font-code text-sm border-b border-white/20 pb-1 hover:border-primary"
											href="https://www.linkedin.com/in/sarthak-routray-020583323/"
											target="_blank"
											rel="noreferrer"
										>
											LinkedIn
										</a>
										<a
											className="text-white hover:text-primary transition-colors flex items-center gap-2 font-code text-sm border-b border-white/20 pb-1 hover:border-primary"
											href="https://github.com/sarthakroutray"
											target="_blank"
											rel="noreferrer"
										>
											GitHub
										</a>
									</div>
								</div>
							</div>
						</GlassSurface>
					</div>
				</section>

				{/* ── Projects Section ─────────────────────────────────────────────── */}
				<section
					className="min-h-[100vh] flex flex-col justify-center relative px-4 md:px-20 py-32"
					id="projects"
				>
					<div
						className={`absolute -right-1/4 top-1/4 ${styles.meshGradient1} w-[800px] h-[800px] rounded-full opacity-30 pointer-events-none`}
					></div>
					<div
						className="max-w-7xl w-full mx-auto z-10"
						ref={(el) => {
							sectionInnerRefs.current[1] = el;
						}}
					>
						<div className="flex items-end justify-between mb-16">
							<h2 className="font-headline-lg text-5xl md:text-6xl text-white italic">
								Selected <br />
								<span className="not-italic opacity-70">Works</span>
							</h2>
						</div>

						{/* Bento Grid layout for projects */}
						<div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
							{/* Project 1: SentinelAI */}
							<div className="md:col-span-8 flex">
								<GlassSurface
									width="100%"
									height="100%"
									borderRadius={24}
									displace={0.5}
									opacity={0.6}
									blur={16}
								>
									<a
										href="https://github.com/sarthakroutray/SentinelAI"
										target="_blank"
										rel="noreferrer"
										className={`p-8 flex flex-col justify-between group cursor-pointer w-full h-full`}
									>
										<div className="flex justify-between items-start">
											<div>
												<h3 className="font-headline-md text-3xl text-white mb-3">
													SentinelAI
												</h3>
												<p className="font-body-md text-white/80 max-w-lg font-light leading-relaxed mb-6">
													Built a real-time anomaly detection engine with REST
													log ingestion, Redis queues, and WebSocket alerts
													streamed to a Next.js monitoring UI for sub-second
													incident visibility.
												</p>
												<p className="font-code text-xs text-primary mb-4 border-l-2 border-primary/50 pl-3">
													Tech: FastAPI, Next.js, PostgreSQL, Redis, Docker,
													scikit-learn, WebSockets
												</p>
											</div>
											<div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
												<ArrowUpRight className="w-5 h-5 text-primary" />
											</div>
										</div>
										<div className="flex flex-wrap gap-2 mt-auto pt-6">
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
												#ml
											</span>
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
												#realtime
											</span>
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20">
												#monitoring
											</span>
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
												#backend
											</span>
										</div>
									</a>
								</GlassSurface>
							</div>

							{/* Project 2: IntelliMed-AI */}
							<div className="md:col-span-4 flex">
								<GlassSurface
									width="100%"
									height="100%"
									borderRadius={24}
									displace={0.5}
									opacity={0.6}
									blur={16}
								>
									<a
										href="https://github.com/sarthakroutray/IntelliMed-AI"
										target="_blank"
										rel="noreferrer"
										className={`p-8 flex flex-col justify-between group cursor-pointer w-full h-full`}
									>
										<div className="flex justify-between items-start">
											<div>
												<h3 className="font-headline-md text-2xl text-white mb-3">
													IntelliMed AI
												</h3>
												<p className="font-body-md text-sm text-white/80 font-light mb-4">
													Built a full-stack medical platform with OCR, NLP
													extraction, and X-ray classification across three
													parallel AI services with graceful degradation.
												</p>
											</div>
											<div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
												<ArrowUpRight className="w-4 h-4 text-primary" />
											</div>
										</div>
										<div className="flex flex-wrap gap-2 mt-auto pt-4">
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
												#ai
											</span>
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
												#healthtech
											</span>
										</div>
									</a>
								</GlassSurface>
							</div>

							{/* Project 3 & 4: RedConnect / Finance ETL */}
							<div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
								<GlassSurface
									width="100%"
									height="100%"
									borderRadius={24}
									displace={0.5}
									opacity={0.6}
									blur={16}
								>
									<a
										href="https://github.com/sarthakroutray/RedConnect.git"
										target="_blank"
										rel="noreferrer"
										className={`p-8 flex flex-col justify-between group cursor-pointer w-full h-full`}
									>
										<div className="flex justify-between items-start">
											<div>
												<h3 className="font-headline-md text-2xl text-white mb-3">
													RedConnect
												</h3>
												<p className="font-body-md text-sm text-white/80 font-light mb-4">
													Launched a donor-recipient matching platform with
													public search, emergency requests, and a
													JWT-authenticated admin dashboard.
												</p>
											</div>
										</div>
										<div className="flex flex-wrap gap-2 mt-auto pt-4">
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
												#frontend
											</span>
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
												#backend
											</span>
										</div>
									</a>
								</GlassSurface>

								<GlassSurface
									width="100%"
									height="100%"
									borderRadius={24}
									displace={0.5}
									opacity={0.6}
									blur={16}
								>
									<a
										href="https://github.com/sarthakroutray/Finance-ETL"
										target="_blank"
										rel="noreferrer"
										className={`p-8 flex flex-col justify-between group cursor-pointer w-full h-full`}
									>
										<div className="flex justify-between items-start">
											<div>
												<h3 className="font-headline-md text-2xl text-white mb-3">
													Finance ETL Pipeline
												</h3>
												<p className="font-body-md text-sm text-white/80 font-light mb-4">
													Built a modular ETL system that ingests PDFs, emails,
													and Excel reports into PostgreSQL with automated
													categorization and REST APIs.
												</p>
											</div>
										</div>
										<div className="flex flex-wrap gap-2 mt-auto pt-4">
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
												#etl
											</span>
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
												#data
											</span>
										</div>
									</a>
								</GlassSurface>
							</div>

							{/* Project 5: Final Destination / Project 6: ELICIT-25 */}
							<div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
								<GlassSurface
									width="100%"
									height="100%"
									borderRadius={24}
									displace={0.5}
									opacity={0.6}
									blur={16}
								>
									<a
										href="https://github.com/sarthakroutray/Final-Destination"
										target="_blank"
										rel="noreferrer"
										className={`p-8 flex flex-col justify-between group cursor-pointer w-full h-full`}
									>
										<div className="flex justify-between items-start">
											<div>
												<h3 className="font-headline-md text-2xl text-white mb-3">
													Final Destination
												</h3>
												<p className="font-body-md text-sm text-white/80 font-light mb-4">
													Engineered a live campus event tracker with a
													non-blocking FastAPI backend and a React frontend
													optimized for 200–300 concurrent users.
												</p>
											</div>
										</div>
										<div className="flex flex-wrap gap-2 mt-auto pt-4">
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
												#realtime
											</span>
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20">
												#fastapi
											</span>
										</div>
									</a>
								</GlassSurface>

								<GlassSurface
									width="100%"
									height="100%"
									borderRadius={24}
									displace={0.5}
									opacity={0.6}
									blur={16}
								>
									<a
										href="https://github.com/sarthakroutray/ELICIT-25"
										target="_blank"
										rel="noreferrer"
										className={`p-8 flex flex-col justify-between group cursor-pointer w-full h-full`}
									>
										<div className="flex justify-between items-start">
											<div>
												<h3 className="font-headline-md text-2xl text-white mb-3">
													ELICIT-25
												</h3>
												<p className="font-body-md text-sm text-white/80 font-light mb-4">
													Led a 291-commit TypeScript/React/Three.js codebase
													across 8 teams for MUJ ACM’s annual techfest, serving
													thousands of students.
												</p>
											</div>
										</div>
										<div className="flex flex-wrap gap-2 mt-auto pt-4">
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
												#leadership
											</span>
											<span className="font-code text-xs text-white/90 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20">
												#frontend
											</span>
										</div>
									</a>
								</GlassSurface>
							</div>
						</div>
					</div>
				</section>

				{/* ── Experience Section ───────────────────────────────────────────── */}
				<section
					className="min-h-[100vh] flex flex-col justify-center relative px-4 md:px-20 py-32"
					id="experience"
				>
					<div
						className="max-w-4xl mx-auto z-10 w-full"
						ref={(el) => {
							sectionInnerRefs.current[2] = el;
						}}
					>
						<h2 className="font-headline-lg text-5xl md:text-6xl text-white mb-20 text-center italic">
							Experience
						</h2>
						<div className="relative">
							{/* Vertical Line */}
							<div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent md:-translate-x-1/2 z-0"></div>

							{/* Item 1 */}
							<div className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-20 md:mb-24 w-full pl-16 md:pl-0 z-10">
								<div className="md:w-[45%] text-left md:text-right w-full mb-4 md:mb-0">
									<p className="font-code text-xs text-primary mb-2 uppercase tracking-widest">
										April 2026 - Present
									</p>
									<h3 className="font-headline-md text-2xl md:text-3xl text-white mb-1">
										Technical Secretary
									</h3>
									<p className="font-body-md text-white/80 italic">
										ACM Student Chapter, Manipal University Jaipur
									</p>
								</div>
								<div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-[#050508] border-2 border-primary -translate-x-1/2 md:-translate-x-1/2 top-1 md:top-auto shadow-[0_0_15px_rgba(77,142,255,0.5)] z-20"></div>
								<div className="md:w-[45%] w-full">
									<GlassSurface
										width="100%"
										height="100%"
										borderRadius={24}
										displace={0.3}
										opacity={0.6}
										blur={16}
									>
										<div className="p-6 md:p-8">
											<p className="font-body-md text-white/80 font-light text-sm md:text-base leading-relaxed">
												Leading full-stack delivery for ELICIT-25 (291-commit
												TypeScript/React/Three.js codebase) and Oneiros-26,
												coordinating 8 contributors with CI/CD-aligned reviews
												and mentoring juniors on architecture.
											</p>
										</div>
									</GlassSurface>
								</div>
							</div>

							{/* Item 2 */}
							<div className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-20 md:mb-24 w-full pl-16 md:pl-0 z-10">
								<div className="md:w-[45%] w-full text-left md:text-right order-2 md:order-1 mt-4 md:mt-0">
									<GlassSurface
										width="100%"
										height="100%"
										borderRadius={24}
										displace={0.3}
										opacity={0.6}
										blur={16}
									>
										<div className="p-6 md:p-8">
											<p className="font-body-md text-white/80 font-light text-sm md:text-base leading-relaxed">
												Spearheaded chapter web platforms using React and
												TypeScript. Standardized component and API integration
												patterns across event modules and mentored juniors on
												architecture.
											</p>
										</div>
									</GlassSurface>
								</div>
								<div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-[#050508] border-2 border-white/50 -translate-x-1/2 md:-translate-x-1/2 top-1 md:top-auto z-20 order-1 md:order-2"></div>
								<div className="md:w-[45%] w-full order-1 md:order-3">
									<p className="font-code text-xs text-secondary mb-2 uppercase tracking-widest">
										Aug 2025 - April 2026
									</p>
									<h3 className="font-headline-md text-2xl md:text-3xl text-white mb-1">
										Web Development Team Head
									</h3>
									<p className="font-body-md text-white/80 italic">
										ACM Student Chapter, Manipal University Jaipur
									</p>
								</div>
							</div>

							{/* Item 3 */}
							<div className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-20 md:mb-24 w-full pl-16 md:pl-0 z-10">
								<div className="md:w-[45%] w-full text-left md:text-right order-2 md:order-1 mt-4 md:mt-0">
									<GlassSurface
										width="100%"
										height="100%"
										borderRadius={24}
										displace={0.3}
										opacity={0.6}
										blur={16}
									>
										<div className="p-6 md:p-8">
											<p className="font-body-md text-white/80 font-light text-sm md:text-base leading-relaxed">
												Managed end-to-end ML workflows on financial transaction
												data, from feature engineering to model evaluation.
												Delivered insights that informed product roadmap
												decisions within an Agile sprint cycle.
											</p>
										</div>
									</GlassSurface>
								</div>
								<div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-[#050508] border-2 border-white/50 -translate-x-1/2 md:-translate-x-1/2 top-1 md:top-auto z-20 order-1 md:order-2"></div>
								<div className="md:w-[45%] w-full order-1 md:order-3">
									<p className="font-code text-xs text-secondary mb-2 uppercase tracking-widest">
										Jun 2025 - Jul 2025
									</p>
									<h3 className="font-headline-md text-2xl md:text-3xl text-white mb-1">
										AIML Intern
									</h3>
									<p className="font-body-md text-white/80 italic">
										TransBnk Solutions Private Limited
									</p>
								</div>
							</div>

							{/* Education */}
							<div className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-10 md:mb-12 w-full pl-16 md:pl-0 z-10">
								<div className="md:w-[45%] text-left md:text-right w-full mb-4 md:mb-0">
									<p className="font-code text-xs text-primary mb-2 uppercase tracking-widest">
										Aug 2024 - May 2028
									</p>
									<h3 className="font-headline-md text-2xl md:text-3xl text-white mb-1">
										B.Tech in CSE
									</h3>
									<p className="font-body-md text-white/80 italic">
										Manipal University Jaipur
									</p>
								</div>
								<div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-[#050508] border-2 border-white/40 -translate-x-1/2 md:-translate-x-1/2 top-1 md:top-auto z-20"></div>
								<div className="md:w-[45%] w-full">
									<GlassSurface
										width="100%"
										height="100%"
										borderRadius={24}
										displace={0.3}
										opacity={0.6}
										blur={16}
									>
										<div className="p-6 md:p-8">
											<p className="font-body-md text-white/80 font-light text-sm md:text-base leading-relaxed">
												Computer Science and Engineering
											</p>
										</div>
									</GlassSurface>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* ── Skills Section ───────────────────────────────────────────────── */}
				<section
					className="min-h-[100vh] flex flex-col items-center justify-center relative px-4 md:px-20 py-32"
					id="skills"
				>
					<div
						className={`absolute inset-0 ${styles.meshGradient2} opacity-20 pointer-events-none`}
					></div>
					<div
						className="max-w-6xl w-full z-10 flex flex-col items-center justify-center"
						ref={(el) => {
							sectionInnerRefs.current[3] = el;
						}}
					>
						<h2 className="font-headline-lg text-5xl md:text-6xl text-white mb-10 z-10 italic">
							Skills
						</h2>
						<p className="font-body-lg text-white/70 max-w-3xl text-center mb-12 font-light">
							Full-stack engineering across product-grade UI, scalable APIs, and
							ML-backed pipelines.
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
							{/* Languages */}
							<GlassSurface
								width="100%"
								height="100%"
								borderRadius={24}
								displace={0.4}
								opacity={0.5}
								blur={16}
							>
								<div className="p-8 flex flex-col h-full">
									<div className="flex items-center gap-4 mb-6">
										<Layers className="w-6 h-6 text-primary" />
										<h3 className="font-headline-md text-2xl text-white">
											Languages
										</h3>
									</div>
									<div className="flex flex-col gap-3 font-code text-sm text-white/80">
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{" "}
											Python
										</div>
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{" "}
											JavaScript / TypeScript
										</div>
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{" "}
											Java
										</div>
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{" "}
											SQL / C
										</div>
									</div>
								</div>
							</GlassSurface>

							{/* Frontend */}
							<GlassSurface
								width="100%"
								height="100%"
								borderRadius={24}
								displace={0.4}
								opacity={0.5}
								blur={16}
							>
								<div className="p-8 flex flex-col h-full">
									<div className="flex items-center gap-4 mb-6">
										<Server className="w-6 h-6 text-secondary" />
										<h3 className="font-headline-md text-2xl text-white">
											Frontend
										</h3>
									</div>
									<div className="flex flex-col gap-3 font-code text-sm text-white/80">
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>{" "}
											React / Next.js
										</div>
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>{" "}
											Vite / Tailwind
										</div>
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>{" "}
											Framer Motion
										</div>
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>{" "}
											Three.js / R3F
										</div>
									</div>
								</div>
							</GlassSurface>

							{/* Backend */}
							<GlassSurface
								width="100%"
								height="100%"
								borderRadius={24}
								displace={0.4}
								opacity={0.5}
								blur={16}
							>
								<div className="p-8 flex flex-col h-full">
									<div className="flex items-center gap-4 mb-6">
										<BrainCircuit className="w-6 h-6 text-pink-500" />
										<h3 className="font-headline-md text-2xl text-white">
											Backend
										</h3>
									</div>
									<div className="flex flex-col gap-3 font-code text-sm text-white/80">
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-pink-500/50"></span>{" "}
											Node.js / Express
										</div>
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-pink-500/50"></span>{" "}
											FastAPI / REST / WebSockets
										</div>
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-pink-500/50"></span>{" "}
											JWT / OAuth
										</div>
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-pink-500/50"></span>{" "}
											PostgreSQL / MongoDB / Redis
										</div>
									</div>
								</div>
							</GlassSurface>

							{/* AI/ML + DevOps */}
							<GlassSurface
								width="100%"
								height="100%"
								borderRadius={24}
								displace={0.4}
								opacity={0.5}
								blur={16}
							>
								<div className="p-8 flex flex-col h-full">
									<div className="flex items-center gap-4 mb-6">
										<Wrench className="w-6 h-6 text-yellow-500" />
										<h3 className="font-headline-md text-2xl text-white">
											AI/ML + DevOps
										</h3>
									</div>
									<div className="flex flex-col gap-3 font-code text-sm text-white/80">
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span>{" "}
											PyTorch / scikit-learn
										</div>
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span>{" "}
											spaCy / OpenCV / OCR
										</div>
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span>{" "}
											Docker / CI-CD
										</div>
										<div className="flex items-center gap-3">
											<span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span>{" "}
											Git / Vercel / Render / Supabase
										</div>
									</div>
								</div>
							</GlassSurface>
						</div>
					</div>
				</section>

				{/* ── Contact Section ──────────────────────────────────────────────── */}
				<section
					className="min-h-[100vh] flex flex-col justify-center relative px-4 md:px-20 py-32"
					id="contact"
				>
					<div
						className="max-w-6xl mx-auto w-full z-10 flex flex-col lg:flex-row gap-16 lg:gap-20"
						ref={(el) => {
							sectionInnerRefs.current[4] = el;
						}}
					>
						<div className="lg:w-1/2 flex flex-col justify-center">
							<h2 className="font-headline-xl text-6xl md:text-[80px] text-white mb-6 leading-[1.1] italic">
								Let's <br />
								<span className="not-italic">Connect</span>
							</h2>
							<p className="font-body-lg text-white/80 font-light mb-6 max-w-md">
								Open to SWE roles in product-focused teams.
							</p>
							<div className="flex flex-col gap-2 font-code text-sm text-white/70 mb-10">
								<span>Mumbai, India</span>
								<a
									className="hover:text-primary transition-colors"
									href="mailto:sarthak.routray2006@gmail.com"
								>
									sarthak.routray2006@gmail.com
								</a>
								<a
									className="hover:text-primary transition-colors"
									href="tel:+919819362168"
								>
									+91 9819362168
								</a>
							</div>
							<div className="flex gap-6">
								<a
									aria-label="GitHub"
									className={`w-14 h-14 rounded-full ${styles.glassPanel} flex items-center justify-center text-white hover:text-primary hover:border-primary/50 transition-all shadow-lg hover:-translate-y-1`}
									href="https://github.com/sarthakroutray"
								>
									<Github className="w-6 h-6" />
								</a>
								<a
									aria-label="LinkedIn"
									className={`w-14 h-14 rounded-full ${styles.glassPanel} flex items-center justify-center text-white hover:text-primary hover:border-primary/50 transition-all shadow-lg hover:-translate-y-1`}
									href="https://www.linkedin.com/in/sarthak-routray-020583323/"
								>
									<Linkedin className="w-6 h-6" />
								</a>
								<a
									aria-label="Email"
									className={`w-14 h-14 rounded-full ${styles.glassPanel} flex items-center justify-center text-white hover:text-primary hover:border-primary/50 transition-all shadow-lg hover:-translate-y-1`}
									href="mailto:sarthak.routray2006@gmail.com"
								>
									<Mail className="w-6 h-6" />
								</a>
							</div>
						</div>
						<div className="lg:w-1/2">
							<GlassSurface
								width="100%"
								height="100%"
								borderRadius={24}
								displace={0.5}
								opacity={0.6}
								blur={16}
							>
								<div className="p-8 md:p-10 w-full">
									<form
										className="flex flex-col gap-8"
										action="https://formspree.io/f/YOUR_FORM_ID"
										method="POST"
									>
										<div className="flex flex-col gap-2">
											<label
												className="font-caption text-xs uppercase tracking-widest text-white/50"
												htmlFor="name"
											>
												Name
											</label>
											<input
												className="bg-transparent border-b border-white/10 p-2 font-body-md text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
												id="name"
												name="name"
												placeholder="Your Name"
												type="text"
												required
											/>
										</div>
										<div className="flex flex-col gap-2">
											<label
												className="font-caption text-xs uppercase tracking-widest text-white/50"
												htmlFor="email"
											>
												Email
											</label>
											<input
												className="bg-transparent border-b border-white/10 p-2 font-body-md text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
												id="email"
												name="email"
												placeholder="your.email@example.com"
												type="email"
												required
											/>
										</div>
										<div className="flex flex-col gap-2">
											<label
												className="font-caption text-xs uppercase tracking-widest text-white/50"
												htmlFor="message"
											>
												Message
											</label>
											<textarea
												className="bg-transparent border-b border-white/10 p-2 font-body-md text-white focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-white/20"
												id="message"
												name="message"
												placeholder="How can I help you?"
												rows={4}
												required
											></textarea>
										</div>
										<button
											className={`mt-4 ${styles.btnPremium} text-primary px-8 py-4 rounded-xl font-caption uppercase tracking-wider hover:text-white text-center shadow-[0_4px_20px_rgba(77,142,255,0.15)] transition-all`}
											type="submit"
										>
											Send Message
										</button>
									</form>
								</div>
							</GlassSurface>
						</div>
					</div>
				</section>
			</main>

			<footer className="py-8 px-4 md:px-20 z-[10] relative flex flex-col md:flex-row justify-between items-center gap-4 font-caption text-[10px] md:text-xs text-white/40 uppercase tracking-widest border-t border-white/5 w-full">
				<p>© 2026 Sarthak Routray. Cinematic Edition.</p>
				<p>Crafted with Precision</p>
			</footer>

			{/* ── Progress bar ─────────────────────────────────────────────────── */}
			<div className={styles.progressBar} aria-hidden="true">
				<div
					ref={progressFillRef}
					className={styles.progressFill}
					id="scroll-progress-fill"
				/>
			</div>
		</div>
	);
}
