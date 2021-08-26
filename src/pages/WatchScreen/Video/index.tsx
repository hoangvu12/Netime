/* eslint-disable react/self-closing-comp */
import Hls from "hls.js";
import PlyrJS, { Options, PlyrEvent as PlyrJSEvent, SourceInfo } from "plyr";
import "plyr/dist/plyr.css";
import PropTypes from "prop-types";
import React, {
  HTMLProps,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import Portal from "../../../components/Portal";
import Overlay from "./Overlay";
import "./Video.css";
export { addButtons } from "./methods";

export type PlyrInstance = PlyrJS;
export type PlyrEvent = PlyrJSEvent;
export type PlyrCallback = (this: PlyrJS, event: PlyrEvent) => void;

export type PlyrControlButton = string | JSX.Element;

export type PlyrProps = HTMLProps<HTMLVideoElement> & {
  source?: SourceInfo;
  options?: Options;
  onReady?: (player: PlyrJS, event: PlyrJS.PlyrEvent) => void;
  onSourceChange?: (player: PlyrJS) => void;
  nextEpisodeClick?: () => void;
};

export interface HTMLPlyrVideoElement extends HTMLVideoElement {
  plyr?: PlyrInstance;
}

let isListening = false;

const Plyr: React.FC<PropsWithChildren<PlyrProps>> = (props) => {
  const {
    options = null,
    source,
    onReady,
    onSourceChange,
    children,
    nextEpisodeClick,
    ...rest
  } = props;
  const videoSource = source?.sources[0].src!;
  const [player, setPlayer] = useState<PlyrInstance | undefined>();
  const [container, setContainer] = useState<Element | null>();

  const innerRef = useRef<HTMLPlyrVideoElement>();
  const hls = useRef(new Hls());

  const videoOptions: PlyrJS.Options = {
    ...options,
    quality: {
      default: 720,
      options: [720],
    },
  };

  const createPlayer = () => {
    const plyrPlayer = new PlyrJS(".plyr-react", videoOptions);
    isListening = false;

    if (!videoSource.includes("m3u8")) {
      plyrPlayer.source = source!;
    }

    plyrPlayer.on("ready", (event) => {
      setPlayer(plyrPlayer);

      if (isListening) return;

      isListening = true;

      onReady?.(plyrPlayer, event);

      setContainer(document.querySelector(".plyr--video"));
    });

    plyrPlayer.on("enterfullscreen", () => {
     window.screen.orientation.lock("landscape")
    });
  };

  hls.current.on(Hls.Events.MANIFEST_LOADED, () => {
    videoOptions.quality = {
      default: hls.current.levels[hls.current.levels.length - 1].height,
      options: hls.current.levels.map((level) => level.height),
      forced: true,
      // Manage quality changes
      onChange: (quality: number) => {
        hls.current.levels.forEach((level, levelIndex) => {
          if (level.height === quality) {
            hls.current.currentLevel = levelIndex;
          }
        });
      },
    };

    createPlayer();
  });

  // Remove footer
  useEffect(() => {
    const footer = document.querySelector("footer");

    footer?.classList.add("hidden");

    return () => {
      footer?.classList.remove("hidden");
    };
  }, []);

  useEffect(() => {
    onSourceChange?.(player!);
  }, [player, onSourceChange]);

  useEffect(() => {
    if (!innerRef.current) return;

    if (videoSource.includes("m3u8") && Hls.isSupported()) {
      hls.current.loadSource(videoSource);
      hls.current.attachMedia(innerRef.current as HTMLMediaElement);

      player?.on("play", () => hls.current.startLoad());

      player?.on("qualitychange", () => {
        if (innerRef.current?.plyr?.currentTime !== 0) {
          hls.current.startLoad();
        }
      });
    } else {
      createPlayer();
    }

    return () => player?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSource]);

  return (
    <>
      <video
        ref={innerRef as unknown as MutableRefObject<HTMLVideoElement>}
        className="plyr-react plyr"
        {...rest}
      />
      {container && (
        <Portal element={container}>
          <Overlay nextEpisodeClick={nextEpisodeClick} player={player!}>
            {children}
          </Overlay>
        </Portal>
      )}
    </>
  );
};

Plyr.displayName = "Plyr";

Plyr.defaultProps = {
  options: {
    iconPrefix: "plyr",
    iconUrl: "/plyr.svg",
    i18n: {
      restart: "Xem lại",
      rewind: "Lùi {seektime} giây",
      play: "Xem",
      pause: "Dừng",
      fastForward: "Tiến {seektime} giây",
      seek: "Tua",
      seekLabel: "{currentTime} / {duration}",
      played: "Đã chạy",
      buffered: "Đã load",
      currentTime: "Thời gian hiện tại",
      duration: "Thời lượng",
      volume: "Âm lượng",
      mute: "Tắt âm lượng",
      unmute: "Mở âm lượng",
      enableCaptions: "Mở phụ đề",
      disableCaptions: "Tắt phụ đề",
      download: "Tải xuống",
      enterFullscreen: "Mở toàn màn hình",
      exitFullscreen: "Thoát toàn màn hình",
      frameTitle: "Video {title}",
      captions: "Phụ đề",
      settings: "Cài đặt",
      menuBack: "Trở về menu",
      speed: "Tốc độ",
      normal: "Bình thường",
      quality: "Chất lượng video",
      loop: "Lặp",
    },
    controls: [
      "play-large",
      "play",
      "rewind",
      "fast-forward",
      "progress",
      "current-time",
      "mute",
      "volume",
      "settings",
      "fullscreen",
    ],
    autoplay: true,
  },
};

Plyr.propTypes = {
  options: PropTypes.object,
  source: PropTypes.any,
};

export default React.memo(
  Plyr,
  (prevProps: PlyrProps, nextProps: PlyrProps) => {
    return (
      prevProps.source?.sources[0].src === nextProps.source?.sources[0].src
    );
  }
);
