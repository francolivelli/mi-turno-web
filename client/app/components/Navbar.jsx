"use client";
import React from "react";
import styles from "../../styles/components/Navbar.module.css";
import { usePathname, useRouter } from "next/navigation";

function Navbar({ user }) {
  const currentPath = usePathname();
  const router = useRouter();

  const linkText = user.role === "operator" ? "Reservas" : "Mis Reservas";
  const linkHref = currentPath === "/bookings" ? null : "/bookings";
  const linkClass =
    currentPath === "/bookings" ? styles["link-active"] : styles.link;

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        {user.role === "client" && (
          <button
            className={"btn-secondary"}
            onClick={() => router.push("/bookings/create")}>
            Reservar
          </button>
        )}
        {user.role === "admin" && (
          <button
            className={"btn-secondary"}
            onClick={() => router.push("/branches/create")}>
            Crear sucursal
          </button>
        )}
        {user.role === "admin" && (
          <button
            className={"btn-secondary"}
            onClick={() => router.push("/operators/create")}>
            Crear operador
          </button>
        )}
      </div>
      <div className={styles.options}>
        <>
          {user.role === "admin" && (
            <>
              <a
                href={currentPath === "/branches" ? null : "/branches"}
                className={
                  currentPath === "/branches"
                    ? styles["link-active"]
                    : styles.link
                }>
                Sucursales
                <svg
                  width="24"
                  height="18"
                  viewBox="0 0 24 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.75 0C3.33579 0 3 0.335786 3 0.75V2.74219L0.890625 5.55469L0.75 5.74219V6C0.75 7.23409 1.76591 8.25 3 8.25V17.25C3 17.6642 3.33579 18 3.75 18H14.25C14.6642 18 15 17.6642 15 17.25V11.25H16.5V17.25C16.5 17.6642 16.8358 18 17.25 18H20.25C20.6642 18 21 17.6642 21 17.25V8.25C22.2341 8.25 23.25 7.23409 23.25 6V5.74219L23.1094 5.55469L21 2.74219V0.75C21 0.335786 20.6642 0 20.25 0H3.75ZM4.5 1.5H19.5V2.25H4.5V1.5ZM4.125 3.75H19.875L21.6797 6.16406C21.5977 6.48948 21.3518 6.75 21 6.75C20.7597 6.75 20.5467 6.63848 20.4097 6.4641C20.2391 6.24697 20.0261 6 19.75 6H19.25C18.9739 6 18.7609 6.24696 18.5903 6.4641C18.4533 6.63848 18.2403 6.75 18 6.75C17.7597 6.75 17.5467 6.63848 17.4097 6.4641C17.2391 6.24697 17.0261 6 16.75 6H16.25C15.9739 6 15.7609 6.24696 15.5903 6.4641C15.4533 6.63848 15.2403 6.75 15 6.75C14.7597 6.75 14.5467 6.63848 14.4097 6.4641C14.2391 6.24697 14.0261 6 13.75 6H13.25C12.9739 6 12.7609 6.24696 12.5903 6.4641C12.4533 6.63848 12.2403 6.75 12 6.75C11.7597 6.75 11.5467 6.63848 11.4097 6.4641C11.2391 6.24697 11.0261 6 10.75 6H10.25C9.97386 6 9.7609 6.24696 9.59029 6.4641C9.45327 6.63848 9.24029 6.75 9 6.75C8.75971 6.75 8.54673 6.63848 8.40971 6.4641C8.2391 6.24697 8.02614 6 7.75 6H7.25C6.97386 6 6.7609 6.24697 6.59029 6.4641C6.45327 6.63848 6.24029 6.75 6 6.75C5.75971 6.75 5.54673 6.63848 5.40971 6.4641C5.2391 6.24696 5.02614 6 4.75 6H4.25C3.97386 6 3.7609 6.24697 3.59029 6.4641C3.45327 6.63848 3.24029 6.75 3 6.75C2.64818 6.75 2.40234 6.48948 2.32031 6.16406L4.125 3.75ZM4.5 7.66406C4.89966 8.0248 5.4247 8.25 6 8.25C6.41484 8.25 6.80354 8.13291 7.13795 7.93234C7.35781 7.80047 7.64219 7.80047 7.86205 7.93234C8.19646 8.13291 8.58516 8.25 9 8.25C9.41484 8.25 9.80354 8.13291 10.1379 7.93234C10.3578 7.80047 10.6422 7.80047 10.8621 7.93234C11.1965 8.13291 11.5852 8.25 12 8.25C12.4148 8.25 12.8035 8.13291 13.1379 7.93234C13.3578 7.80047 13.6422 7.80047 13.8621 7.93234C14.1965 8.13291 14.5852 8.25 15 8.25C15.4148 8.25 15.8035 8.13291 16.1379 7.93234C16.3578 7.80047 16.6422 7.80047 16.8621 7.93234C17.1965 8.13291 17.5852 8.25 18 8.25C18.5753 8.25 19.1003 8.0248 19.5 7.66406V16.5H18V10.5C18 10.0858 17.6642 9.75 17.25 9.75H14.25C13.8358 9.75 13.5 10.0858 13.5 10.5V16.5H4.5V7.66406ZM6.75 9.75C6.33579 9.75 6 10.0858 6 10.5V14.25C6 14.6642 6.33579 15 6.75 15H11.25C11.6642 15 12 14.6642 12 14.25V10.5C12 10.0858 11.6642 9.75 11.25 9.75H6.75ZM7.5 11.25H10.5V13.5H7.5V11.25Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href={currentPath === "/operators" ? null : "/operators"}
                className={
                  currentPath === "/operators"
                    ? styles["link-active"]
                    : styles.link
                }>
                Operators{" "}
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 0.25C4.46591 0.25 0.75 3.96591 0.75 8.5V9.64844C0.296331 10.1356 0 10.773 0 11.5C0 12.6959 0.77087 13.6056 1.78125 14.1016C2.63254 17.3013 5.51555 19.75 9 19.75C11.4539 19.75 13.6226 18.6016 14.9766 16.75H15C16.4502 16.75 17.65 15.7267 17.9297 14.3594C18.0775 14.2914 18.212 14.1943 18.3281 14.0781C18.6109 13.7954 18.75 13.3917 18.75 13V9.25C18.75 8.85833 18.6109 8.45465 18.3281 8.17188C18.0454 7.8891 17.6417 7.75 17.25 7.75H17.2031C16.8215 3.56224 13.2821 0.25 9 0.25ZM9 1.75C12.2748 1.75 15.0037 4.10808 15.6094 7.21094C15.4732 7.15947 15.3372 7.12392 15.2109 7.09375C14.6783 6.96651 14.1625 6.93125 13.6875 6.8125C13.2125 6.69375 12.8299 6.52304 12.5391 6.15625C12.2482 5.78946 12 5.16471 12 4H10.5C10.5 5.47955 10.0763 6.07444 9.44531 6.46094C8.8143 6.84744 7.81305 6.97737 6.72656 7C5.64008 7.02263 4.52119 6.93812 3.51562 7.14062C3.09129 7.22608 2.65773 7.36043 2.29688 7.63281C2.72776 4.32634 5.57989 1.75 9 1.75ZM11.2031 6.83594C11.258 6.92016 11.3065 7.01718 11.3672 7.09375C11.9201 7.79103 12.6625 8.10312 13.3125 8.26562C13.9625 8.42813 14.5717 8.47255 14.8828 8.54688C14.9808 8.57029 14.9761 8.57984 15 8.59375V13.75V14.5H15.75H16.3125C16.0708 14.9612 15.6076 15.25 15 15.25H10.4297C10.2768 14.8102 9.86688 14.5 9.375 14.5C8.75368 14.5 8.25 15.0037 8.25 15.625C8.25 16.2463 8.75368 16.75 9.375 16.75H12.9844C11.9415 17.6929 10.5503 18.25 9 18.25C6.13546 18.25 3.73982 16.1787 3.14062 13.5156L3.04688 13.0938L2.625 12.9531C1.9264 12.7382 1.5 12.2286 1.5 11.5C1.5 10.8712 2.00212 10.2359 2.4375 10.1172L3 9.97656V9.39062C3 9.05956 3.06701 8.97027 3.16406 8.875C3.26112 8.77973 3.45591 8.68585 3.79688 8.61719C4.47881 8.47985 5.60992 8.52424 6.77344 8.5C7.93695 8.47576 9.1857 8.37366 10.2422 7.72656C10.6064 7.5035 10.9375 7.20235 11.2031 6.83594ZM16.5 9.25H17.25V13H16.5V9.25ZM6.375 10C5.75368 10 5.25 10.5037 5.25 11.125C5.25 11.7463 5.75368 12.25 6.375 12.25C6.99632 12.25 7.5 11.7463 7.5 11.125C7.5 10.5037 6.99632 10 6.375 10ZM11.625 10C11.0037 10 10.5 10.5037 10.5 11.125C10.5 11.7463 11.0037 12.25 11.625 12.25C12.2463 12.25 12.75 11.7463 12.75 11.125C12.75 10.5037 12.2463 10 11.625 10Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </>
          )}
          {(user.role === "client" || user.role === "operator") && (
            <a href={linkHref} className={linkClass}>
              {linkText}
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.75 0C4.33579 0 4 0.335786 4 0.75H1C0.585786 0.75 0.25 1.08579 0.25 1.5V4.5V5.25V16.5C0.25 16.9142 0.585786 17.25 1 17.25H19C19.4142 17.25 19.75 16.9142 19.75 16.5V4.5V3.75V1.5C19.75 1.08579 19.4142 0.75 19 0.75H16C16 0.335786 15.6642 0 15.25 0C14.8358 0 14.5 0.335786 14.5 0.75H5.5C5.5 0.335786 5.16421 0 4.75 0ZM1.75 2.25H4C4 2.66421 4.33579 3 4.75 3C5.16421 3 5.5 2.66421 5.5 2.25H14.5C14.5 2.66421 14.8358 3 15.25 3C15.6642 3 16 2.66421 16 2.25H18.25V3.75H1.75V2.25ZM1.75 5.25H18.25V15.75H1.75V5.25ZM11.5 7.5C11.0858 7.5 10.75 7.83579 10.75 8.25V12.75C10.75 13.1642 11.0858 13.5 11.5 13.5H16C16.4142 13.5 16.75 13.1642 16.75 12.75V8.25C16.75 7.83579 16.4142 7.5 16 7.5H11.5ZM4.3 8.25C4.13431 8.25 4 8.38431 4 8.55V9.45C4 9.61569 4.13431 9.75 4.3 9.75H5.2C5.36569 9.75 5.5 9.61569 5.5 9.45V8.55C5.5 8.38431 5.36569 8.25 5.2 8.25H4.3ZM7.3 8.25C7.13431 8.25 7 8.38431 7 8.55V9.45C7 9.61569 7.13431 9.75 7.3 9.75H8.2C8.36569 9.75 8.5 9.61569 8.5 9.45V8.55C8.5 8.38431 8.36569 8.25 8.2 8.25H7.3ZM12.25 9H15.25V12H12.25V9ZM4.3 11.25C4.13431 11.25 4 11.3843 4 11.55V12.45C4 12.6157 4.13431 12.75 4.3 12.75H5.2C5.36569 12.75 5.5 12.6157 5.5 12.45V11.55C5.5 11.3843 5.36569 11.25 5.2 11.25H4.3ZM7.3 11.25C7.13431 11.25 7 11.3843 7 11.55V12.45C7 12.6157 7.13431 12.75 7.3 12.75H8.2C8.36569 12.75 8.5 12.6157 8.5 12.45V11.55C8.5 11.3843 8.36569 11.25 8.2 11.25H7.3Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          )}
          <a
            href={currentPath === "/account" ? null : "/account"}
            className={
              currentPath.startsWith("/account")
                ? styles["link-active"]
                : styles.link
            }>
            Mi Cuenta
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 0C4.91668 0 2.4 2.57388 2.4 5.72727C2.4 7.68523 3.37631 9.42366 4.85 10.4574C2.21621 11.6033 0.322066 14.1599 0.0372289 17.2008C-0.00397591 17.6407 0.358172 18 0.8 18C1.24183 18 1.59503 17.6402 1.64569 17.2013C2.02289 13.933 4.69138 11.4545 8 11.4545C11.3086 11.4545 13.9771 13.933 14.3543 17.2013C14.405 17.6402 14.7582 18 15.2 18C15.6418 18 16.004 17.6407 15.9628 17.2008C15.6779 14.1599 13.7838 11.6033 11.15 10.4574C12.6237 9.42366 13.6 7.68523 13.6 5.72727C13.6 2.57388 11.0833 0 8 0ZM8 1.63636C10.2186 1.63636 12 3.45824 12 5.72727C12 7.99631 10.2186 9.81818 8 9.81818C5.78139 9.81818 4 7.99631 4 5.72727C4 3.45824 5.78139 1.63636 8 1.63636Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </>
      </div>
    </div>
  );
}

export default Navbar;
