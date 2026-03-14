export async function mountOglBackdrop(canvas) {
  if (!canvas) return () => {};
  const ogl = await import("ogl");
  const renderer = new ogl.Renderer({ canvas, alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  const program = new ogl.Program(gl, {
    vertex: `attribute vec2 position; void main(){ gl_Position = vec4(position,0.0,1.0); }`,
    fragment: `precision highp float; uniform float uTime; uniform vec2 uRes; void main(){ vec2 uv=(gl_FragCoord.xy/uRes)-0.5; float glow=0.14/length(uv*vec2(1.0,1.5)); vec3 col=vec3(0.02,0.08,0.22)+vec3(0.06,0.20,0.42)*glow; gl_FragColor=vec4(col,0.92); }`,
    uniforms: { uTime: { value: 0 }, uRes: { value: [1, 1] } },
  });
  const geometry = new ogl.Triangle(gl);
  const mesh = new ogl.Mesh(gl, { geometry, program });
  const resize = () => {
    renderer.setSize(canvas.clientWidth || 1, canvas.clientHeight || 1);
    program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
  };
  resize();
  window.addEventListener("resize", resize);
  let raf = 0;
  const tick = (time) => {
    program.uniforms.uTime.value = time * 0.001;
    renderer.render({ scene: mesh });
    raf = window.requestAnimationFrame(tick);
  };
  raf = window.requestAnimationFrame(tick);
  return () => {
    window.removeEventListener("resize", resize);
    window.cancelAnimationFrame(raf);
  };
}