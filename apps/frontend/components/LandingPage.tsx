"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Terminal, Cloud, ShieldCheck, Globe, Cpu } from "lucide-react";

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Grid Background Effect */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative container mx-auto px-4 pt-20 pb-24 flex flex-col items-center">
        {/* Hero Section */}
        <div className="mb-6 inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="mr-2 flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          v2.0 is now live
        </div>

        <div className="text-center max-w-4xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
            Deploy infrastructure <br />
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              at the speed of code.
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Nimbly converts your configuration files into scalable,
            production-ready cloud infrastructure in seconds. No dashboards
            required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-12 px-8 text-base bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/20"
              onClick={onLogin}
            >
              Start Deploying Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm"
            >
              <Terminal className="mr-2 h-4 w-4" /> Install CLI
            </Button>
          </div>
        </div>

        {/* Improved Product Visual: The Code Editor */}
        <div className="relative w-full max-w-5xl mt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-backwards delay-200">
          <div className="relative rounded-xl border bg-[#1e1e1e] shadow-2xl overflow-hidden">
            {/* Window Controls */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                nimbly.config.yaml
              </div>
              <div className="w-10"></div>
            </div>

            {/* Code Content */}
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed text-gray-300">
                <code>
                  <span className="text-purple-400">service</span>:{" "}
                  <span className="text-green-400">"payment-processor"</span>
                  <span className="text-purple-400">region</span>:{" "}
                  <span className="text-green-400">"us-east-1"</span>
                  <span className="text-purple-400">runtime</span>:{" "}
                  <span className="text-green-400">"nodejs:18"</span>
                  <span className="text-purple-400">resources</span>:
                  <span className="text-blue-400">- type</span>:{" "}
                  <span className="text-yellow-300">Compute</span>
                  <span className="text-blue-400">instances</span>:{" "}
                  <span className="text-orange-400">3</span>
                  <span className="text-blue-400">size</span>:{" "}
                  <span className="text-green-400">"large-x2"</span>
                  <span className="text-blue-400">autoscaling</span>:
                  <span className="text-blue-400">min</span>:{" "}
                  <span className="text-orange-400">1</span>
                  <span className="text-blue-400">max</span>:{" "}
                  <span className="text-orange-400">10</span>
                  <span className="text-blue-400">- type</span>:{" "}
                  <span className="text-yellow-300">Database</span>
                  <span className="text-blue-400">engine</span>:{" "}
                  <span className="text-green-400">"postgres"</span>
                  <span className="text-blue-400">backup</span>:{" "}
                  <span className="text-orange-400">true</span>
                </code>
              </pre>
            </div>

            {/* Floating "Deploying" Status */}
            <div className="absolute bottom-6 right-6 bg-[#252526] border border-[#333] p-3 rounded-lg shadow-xl flex items-center gap-3">
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
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-orange-500/20 blur-3xl opacity-50" />
        </div>

        {/* Feature Grid Mini */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl w-full">
          {[
            {
              icon: Cpu,
              title: "Serverless Compute",
              desc: "Scale to zero when idle, pay only for what you use.",
            },
            {
              icon: ShieldCheck,
              title: "Enterprise Security",
              desc: "SOC2 compliant with automated encryption at rest.",
            },
            {
              icon: Globe,
              title: "Global Edge",
              desc: "Deploy to 35+ regions with a single configuration line.",
            },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
