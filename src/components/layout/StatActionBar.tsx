import ColorButton from "../buttons/ColorButton";
export default function StatActionBar() {
  return (
    <div className="flex items-center gap-2 w-full bg-white p-3 rounded-lg shadow-lg justify-between">
      <div className="flex items-center gap-4">
        {/* <ButtonGroup />
        <PriorityGroup /> */}
      </div>
      <div className="flex items-center gap-4">
        {/* <WhiteButton icon="">Archive</WhiteButton> */}
        <ColorButton
          onClick={() => {
            alert("pdf export");
          }}
          color="blue"
          icon="/add.svg"
        >
          PDF export
        </ColorButton>
      </div>
    </div>
  );
}
