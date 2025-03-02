import { useDisclosure } from "@mantine/hooks";
import { Popover, Text } from "@mantine/core";
import { FaQuestionCircle } from "react-icons/fa";

interface Props {
  answer: string;
}

export default function QuestionPopover({ answer }: Props) {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover width={200} position="bottom" withArrow opened={opened}>
      <Popover.Target>
        <FaQuestionCircle onMouseEnter={open} onMouseLeave={close} />
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: "none" }}>
        <Text size="xs">{answer}</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
