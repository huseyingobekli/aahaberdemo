import { useEffect } from "react";

export default function Game() {
  useEffect(() => {
    // Scripti dinamik olarak yükle
    const script = document.createElement("script");
    script.src = "/unity/Build/aahaberweb.loader.js";
    script.onload = () => {
      // Unity container div'lerini seç
      const container = document.querySelector("#unity-container");
      const canvas = document.querySelector("#unity-canvas");
      const loadingBar = document.querySelector("#unity-loading-bar");

      // Unity build config
      const config = {
        dataUrl: "/unity/Build/aahaberweb.data",
        frameworkUrl: "/unity/Build/aahaberweb.framework.js",
        codeUrl: "/unity/Build/aahaberweb.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "MyCompany",
        productName: "MyGame",
        productVersion: "1.0",
      };

      // createUnityInstance global olarak loader.js içinden geliyor
      if (typeof createUnityInstance !== "undefined") {
        createUnityInstance(canvas, config, (progress) => {
          if (loadingBar) loadingBar.style.display = "block";
        })
          .then((unityInstance) => {
            if (loadingBar) loadingBar.style.display = "none";
          })
          .catch((message) => {
            alert(message);
          });
      } else {
        console.error(
          "createUnityInstance bulunamadı. Loader.js doğru yüklendi mi?"
        );
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="unity-container"
      className="w-full h-screen bg-black flex items-center justify-center"
    >
      <canvas
        id="unity-canvas"
        className="w-full h-full block mx-auto"
      ></canvas>
      <div id="unity-loading-bar" className="absolute  text-white">
        Loading...
      </div>
    </div>
  );
}
