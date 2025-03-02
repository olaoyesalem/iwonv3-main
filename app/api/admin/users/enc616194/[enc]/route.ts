import { NextResponse } from "next/server";
import descrypt from "@/lib/decrypt";

// Protectected route for admin
export const GET = async (
  _request: Request,
  { params }: { params: { enc: string } }
) => {
  try {
    // const data = descrypt(params.enc);

    const data = descrypt(
      "U2FsdGVkX1+/ieb2YUY2pcILTHYAhr9NGy06ooZL/mdrNuccrI0kzZnBVlIxuZPjgBjLJ95eSqf4Al+55Iw1PqnnKtKryo1RHfWGvoCPKMdaShHYy/o4c8pXPEA9pH4A"
    );

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

// testing for getting private key from iwon account for getting private key::
