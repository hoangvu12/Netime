/* eslint-disable react/self-closing-comp */
import Hls, { HlsConfig } from "hls.js";
import PlyrJS, { Options, PlyrEvent as PlyrJSEvent, SourceInfo } from "plyr";
import "plyr/dist/plyr.css";
import PropTypes from "prop-types";
import React, { HTMLProps, MutableRefObject, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { API_URL } from "../../constants";

export type PlyrInstance = PlyrJS;
export type PlyrEvent = PlyrJSEvent;
export type PlyrCallback = (this: PlyrJS, event: PlyrEvent) => void;

export type PlyrControlButton = string | JSX.Element;

export type PlyrProps = HTMLProps<HTMLVideoElement> & {
  source?: SourceInfo;
  options?: Options;
  onReady?: (player: PlyrJS, event: PlyrJS.PlyrEvent) => void;
};

export interface HTMLPlyrVideoElement {
  plyr?: PlyrInstance;
}

let isListening = false;

const hlsConfig: Partial<HlsConfig> = {
  xhrSetup: (xhr, url) => {
    url = `${API_URL}/cors/${url}`;
    xhr.open("GET", url, true);
  },
};

const Plyr: React.FC<PlyrProps> = (props) => {
  const { options = null, source, onReady, ...rest } = props;
  const videoSource = source?.sources[0].src!;

  const innerRef = useRef<HTMLPlyrVideoElement>();
  const hls = useRef(new Hls(hlsConfig));

  const videoOptions: PlyrJS.Options = {
    ...options,
    quality: {
      default: 720,
      options: [720],
    },
  };

  const createPlayer = () => {
    isListening = false;

    const plyrPlayer = new PlyrJS(".plyr-react", videoOptions);

    if (innerRef.current?.plyr) {
      innerRef.current.plyr = plyrPlayer;
    }

    plyrPlayer.on("ready", (event) => {
      if (isListening) return;

      isListening = true;

      if (onReady) {
        onReady(plyrPlayer, event);
      }
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

  useEffect(() => {
    if (!innerRef.current) return;

    if (innerRef.current.plyr) {
      innerRef.current.plyr.destroy();
    }

    if (videoSource.includes("m3u8") && Hls.isSupported()) {
      hls.current.loadSource(source?.sources[0].src!);
      hls.current.attachMedia(innerRef.current as HTMLMediaElement);

      innerRef.current.plyr?.on("play", () => hls.current.startLoad());

      innerRef.current.plyr?.on("qualitychange", () => {
        if (innerRef.current?.plyr?.currentTime !== 0) {
          hls.current.startLoad();
        }
      });
    } else {
      createPlayer();
    }

    if (innerRef.current?.plyr && source) {
      innerRef.current.plyr.source = source;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoOptions]);

  return (
    <video
      ref={innerRef as unknown as MutableRefObject<HTMLVideoElement>}
      className="plyr-react plyr"
      {...rest}
    />
  );
};

export const addButtons = (
  buttons: {
    component: JSX.Element;
    position?: number;
    className?: string;
  }[]
) => {
  buttons.forEach(({ component, position = -1, className }) =>
    addButton(component, position, className)
  );
};

const addButton = (
  button: JSX.Element,
  position: number,
  className?: string
) => {
  const controls = document.querySelector(".plyr__controls");
  const div = document.createElement("div");
  div.className = classNames("plyr__controls__item plyr__control", className);

  const controlsChildNodes = controls?.childNodes;

  if (controlsChildNodes) {
    controls?.insertBefore(
      div,
      position < 0
        ? controlsChildNodes[controlsChildNodes?.length! - 1]
        : controlsChildNodes[position - 1]
    );

    ReactDOM.render(button, div);
  }
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
