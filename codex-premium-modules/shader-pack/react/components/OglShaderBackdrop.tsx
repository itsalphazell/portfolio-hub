"use client";

import { useEffect, useRef } from "react";

export function OglShaderBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let cleanup = () => {};
    let mounted = true;

    async function boot() {
      if (!canvasRef.current) return;
      const ogl = await import("ogl");
      if (!mounted) return;
      const renderer = new ogl.Renderer({ canvas: canvasRef.current, alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      const program = new ogl.Program(gl, {
        vertex: `attribute vec2 position; void main(){ gl_Position = vec4(position,0.0,1.0); }`,
        fragment: `precision highp float; uniform float uTime; uniform vec2 uRes; void main(){ vec2 uv=(gl_FragCoord.xy/uRes.xy)-0.5; float glow=0.15/length(uv*vec2(1.0,1.4)); vec3 col=vec3(0.02,0.08,0.22)+vec3(0.09,0.22,0.45)*glow; col += 0.04*sin(vec3(1.0,1.5,2.0)*(uTime+uv.xyx*4.0)); gl_FragColor=vec4(col,0.9); }`,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: [canvasRef.current.clientWidth || 1, canvasRef.current.clientHeight || 1] },
        },
      });
      const geometry = new ogl.Triangle(gl);
      const mesh = new ogl.Mesh(gl, { geometry, program });

      const resize = () => {
        if (!canvasRef.current) return;
        renderer.setSize(canvasRef.current.clientWidth || 1, canvasRef.current.clientHeight || 1);
        program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
      };
      resize();
      window.addEventListener("resize", resize);

      let raf = 0;
      const tick = (time: number) => {
        program.uniforms.uTime.value = time * 0.001;
        renderer.render({ scene: mesh });
        raf = window.requestAnimationFrame(tick);
      };
      raf = window.requestAnimationFrame(tick);

      cleanup = () => {
        window.removeEventListener("resize", resize);
        window.cancelAnimationFrame(raf);
      };
    }

    void boot();
    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}