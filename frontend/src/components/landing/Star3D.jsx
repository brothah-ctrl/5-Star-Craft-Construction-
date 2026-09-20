import { useEffect, useRef } from "react";

export const Star3D = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        let renderer;
        let frame;
        let disposed = false;
        const mount = mountRef.current;

        (async () => {
            const THREE = await import("three");
            if (disposed || !mount) return;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
            camera.position.set(0, 0, 4.4);

            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(mount.clientWidth, mount.clientHeight);
            mount.appendChild(renderer.domElement);

            const shape = new THREE.Shape();
            const spikes = 5;
            const outer = 1.05;
            const inner = 0.46;
            for (let i = 0; i < spikes * 2; i++) {
                const r = i % 2 === 0 ? outer : inner;
                const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(a) * r;
                const y = Math.sin(a) * r;
                if (i === 0) shape.moveTo(x, y);
                else shape.lineTo(x, y);
            }
            shape.closePath();
            const geo = new THREE.ExtrudeGeometry(shape, {
                depth: 0.32,
                bevelEnabled: true,
                bevelThickness: 0.07,
                bevelSize: 0.05,
                bevelSegments: 3,
            });
            geo.center();
            const mat = new THREE.MeshStandardMaterial({ color: 0xd9a441, metalness: 0.9, roughness: 0.22 });
            const star = new THREE.Mesh(geo, mat);
            scene.add(star);

            scene.add(new THREE.AmbientLight(0xffffff, 0.55));
            const key = new THREE.DirectionalLight(0xfff4d6, 1.7);
            key.position.set(2, 3, 4);
            scene.add(key);
            const rim = new THREE.PointLight(0x4a6db5, 12, 0);
            rim.position.set(-3, -2, 2.5);
            scene.add(rim);

            let tx = 0;
            let ty = 0;
            let t = 0;
            const onMove = (e) => {
                const r = mount.getBoundingClientRect();
                tx = (e.clientX - r.left) / r.width - 0.5;
                ty = (e.clientY - r.top) / r.height - 0.5;
            };
            const onClick = () => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
            mount.addEventListener("mousemove", onMove);
            mount.addEventListener("click", onClick);

            const tick = () => {
                t += 0.008;
                star.rotation.y += (tx * 1.6 + Math.sin(t) * 0.3 - star.rotation.y) * 0.06;
                star.rotation.x += (ty * 0.9 - star.rotation.x) * 0.06;
                star.position.y = Math.sin(t * 1.6) * 0.08;
                renderer.render(scene, camera);
                frame = requestAnimationFrame(tick);
            };
            tick();
        })();

        return () => {
            disposed = true;
            if (frame) cancelAnimationFrame(frame);
            if (renderer) renderer.dispose();
            if (mount) mount.innerHTML = "";
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="h-full w-full cursor-pointer"
            role="button"
            aria-label="Interactive 3D star — click to view the portfolio"
            data-testid="hero-star-3d"
        />
    );
};
