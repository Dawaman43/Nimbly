"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Terminal, Cloud, ShieldCheck, Globe, Cpu, Zap, TrendingDown, Github, Star } from "lucide-react";
import { motion } from "framer-motion";

interface LandingPageProps {
  onLogin: () => void;
  onGetStarted: () => void;
}

export default function LandingPage({ onLogin, onGetStarted }: LandingPageProps) {
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "Deploy infrastructure at the speed of code.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Enhanced Grid Background with Gradient Overlay */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '1s' }}></div>

      <div className="relative container mx-auto px-4 pt-20 pb-24 flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center rounded-full border glass px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <span className="mr-2 flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          v2.0 is now live
        </motion.div>

        {/* Hero Section with Staggered Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Deploy infrastructure <br />
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="gradient-text inline-block"
            >
              {typewriterText}
              <span className="animate-pulse">|</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            An opinionated infrastructure platform that defines how cloud deployments should work, not how vendors force them to work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="h-12 px-8 text-base bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
              onClick={onGetStarted}
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Deploying Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base glass hover:bg-background/90 transition-all duration-300 hover:scale-105"
            >
              <Terminal className="mr-2 h-4 w-4" /> Install CLI
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-12 px-8 text-base hover:bg-background/50 transition-all duration-300"
              asChild
            >
              <a href="https://github.com/Dawaman43/Nimbly" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                <Star className="h-4 w-4" />
                Star on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Code Editor Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="relative w-full max-w-5xl mt-8"
        >
          <div className="relative rounded-xl border glass-card animate-glow overflow-hidden">
            {/* Window Controls */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity cursor-pointer" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e] hover:opacity-80 transition-opacity cursor-pointer" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f] hover:opacity-80 transition-opacity cursor-pointer" />
                </div>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                nimbly.config.yaml
              </div>
              <div className="w-10"></div>
            </div>

            {/* Code Content */}
            <div className="p-6 overflow-x-auto code-editor">
              <pre className="font-mono text-sm leading-relaxed text-gray-300">
                <code>
                  <span className="text-purple-400">service</span>:{" "}
                  <span className="text-green-400">"payment-processor"</span>
                  {"\n"}
                  <span className="text-purple-400">region</span>:{" "}
                  <span className="text-green-400">"us-east-1"</span>
                  {"\n"}
                  <span className="text-purple-400">runtime</span>:{" "}
                  <span className="text-green-400">"nodejs:18"</span>
                  {"\n"}
                  <span className="text-purple-400">resources</span>:
                  {"\n"}
                  <span className="text-blue-400">  - type</span>:{" "}
                  <span className="text-yellow-300">Compute</span>
                  {"\n"}
                  <span className="text-blue-400">    instances</span>:{" "}
                  <span className="text-orange-400">3</span>
                  {"\n"}
                  <span className="text-blue-400">    size</span>:{" "}
                  <span className="text-green-400">"large-x2"</span>
                  {"\n"}
                  <span className="text-blue-400">    autoscaling</span>:
                  {"\n"}
                  <span className="text-blue-400">      min</span>:{" "}
                  <span className="text-orange-400">1</span>
                  {"\n"}
                  <span className="text-blue-400">      max</span>:{" "}
                  <span className="text-orange-400">10</span>
                  {"\n"}
                  <span className="text-blue-400">  - type</span>:{" "}
                  <span className="text-yellow-300">Database</span>
                  {"\n"}
                  <span className="text-blue-400">    engine</span>:{" "}
                  <span className="text-green-400">"postgres"</span>
                  {"\n"}
                  <span className="text-blue-400">    backup</span>:{" "}
                  <span className="text-orange-400">true</span>
                </code>
              </pre>
            </div>

            {/* Animated Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="absolute bottom-6 right-6 glass p-3 rounded-lg shadow-xl flex items-center gap-3 hover:shadow-2xl transition-shadow"
            >
              <div className="relative">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-ping absolute opacity-75"></div>
                <div className="h-3 w-3 bg-green-500 rounded-full relative"></div>
              </div>
              <div className="text-xs font-mono text-gray-300">
                <div className="text-gray-500 uppercase text-[10px]">
                  Status
                </div>
                Deploying...
              </div>
            </motion.div>
          </div>

          {/* Enhanced glow effect */}
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-r from-orange-500/30 to-red-500/30 blur-3xl opacity-50" />
        </motion.div>

        {/* Statistics Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="grid grid-cols-3 gap-8 mt-16 max-w-3xl w-full"
        >
          {[
            { value: "10x", label: "Faster Deployments" },
            { value: "40%", label: "Cost Reduction" },
            { value: "99.9%", label: "Uptime SLA" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Feature Grid with Hover Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl w-full"
        >
          {[
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Deploy to production in seconds, not hours. Built for speed.",
              color: "text-yellow-500",
              bgColor: "bg-yellow-500/10",
            },
            {
              icon: TrendingDown,
              title: "Cost Optimized",
              desc: "AI-powered cost estimation and optimization built-in.",
              color: "text-green-500",
              bgColor: "bg-green-500/10",
            },
            {
              icon: Globe,
              title: "Multi-Cloud",
              desc: "AWS, GCP, Azure - switch providers without rewriting configs.",
              color: "text-blue-500",
              bgColor: "bg-blue-500/10",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl glass-card hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className={`h-14 w-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-lg mb-2 font-heading">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
