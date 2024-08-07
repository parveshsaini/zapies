import { ReactNode } from "react"

export const PrimaryButton = ({ children, onClick, size = "small" }: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-base" : "text-2xl"} ${size === "small" ? "px-8 py-2" : "px-10 py-4"} cursor-pointer font-semibold hover:shadow-md bg-primary text-white rounded-full text-center flex justify-center flex-col`}>
        {children}
    </div>
}