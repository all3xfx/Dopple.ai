const Typing = ({ isDark }) => (
    <div className="typing">
        <div className={"typing__dot" + (isDark === 0 ? " bg-subtext" : isDark === 1 ? " bg-subtext" : isDark === 2 ? " bg-white" : isDark === 3 ? " bg-[#9277FF]" : "")}></div>
        <div className={"typing__dot" + (isDark === 0 ? " bg-subtext" : isDark === 1 ? " bg-subtext" : isDark === 2 ? " bg-white" : isDark === 3 ? " bg-[#9277FF]" : "")}></div>
        <div className={"typing__dot" + (isDark === 0 ? " bg-subtext" : isDark === 1 ? " bg-subtext" : isDark === 2 ? " bg-white" : isDark === 3 ? " bg-[#9277FF]" : "")}></div>
    </div>
)

export default Typing