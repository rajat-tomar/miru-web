import React, { useState, useEffect } from "react";

import classnames from "classnames";
import { NavAvatarSVG } from "miruIcons";

type AvatarProps = {
  url?: string;
  name?: string;
  classNameImg?: string;
  classNameInitials?: string;
  classNameInitialsWrapper?: string;
  initialsLetterCount?: number;
  size?: string;
};

const Avatar = ({
  url = "",
  name = "",
  size = "md:h-10 md:w-10 h-6 w-6",
  classNameImg = "",
  classNameInitials = "",
  classNameInitialsWrapper = "",
  initialsLetterCount = 2,
}: AvatarProps) => {
  const [initials, setInitials] = useState<string>(null);
  const DEFAULT_STYLE_IMAGE = "inline-block rounded-full";

  const DEFAULT_STYLE_INITIALS =
    "md:text-xl text-xs md:font-medium font-light leading-none text-white";

  const DEFAULT_STYLE_INITIALS_WRAPPER =
    "inline-flex rounded-full items-center justify-center bg-gray-500";

  const getInitials = () => {
    if (name) {
      const parts = name.match(/\b(\w)/g);
      const initials = parts.join("").slice(0, initialsLetterCount);
      setInitials(initials.toUpperCase());
    }
  };

  useEffect(() => getInitials(), []);

  if (url) {
    return (
      <img
        alt="profile_pic"
        className={classnames(DEFAULT_STYLE_IMAGE, size, classNameImg)}
        id="logo"
        src={url}
      />
    );
  }

  if (initials) {
    return (
      <div className={classnames("inline-block")}>
        <span
          className={classnames(
            DEFAULT_STYLE_INITIALS_WRAPPER,
            size,
            classNameInitialsWrapper
          )}
        >
          <span
            className={classnames(DEFAULT_STYLE_INITIALS, classNameInitials)}
          >
            {initials}
          </span>
        </span>
      </div>
    );
  }

  return (
    <img
      alt="avatar"
      className={classnames(DEFAULT_STYLE_IMAGE, size, classNameImg)}
      src={NavAvatarSVG}
    />
  );
};

export default Avatar;
