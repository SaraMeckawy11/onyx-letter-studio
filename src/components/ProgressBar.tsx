interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-[2px] bg-sand/30">
      <div
        className="h-full bg-champagne transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
