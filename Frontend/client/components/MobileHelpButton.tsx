import HelpSheet from "@/components/HelpSheet";

export default function MobileHelpButton() {
  return (
    <div className="fixed right-4 bottom-20 z-50 md:hidden">
      <HelpSheet />
    </div>
  );
}
