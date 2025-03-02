"use client";
import { signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";
import ImportWallerModal from "@/components/authenticated/account/ImportWalletModal";
import PersonalDetail from "@/components/authenticated/account/PersonalDetail";
import useTheme from "@/components/hooks/useTheme";
import { Accordion, Avatar, Loader } from "@mantine/core";
import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoMdPerson } from "react-icons/io";
import { CldUploadWidget } from "next-cloudinary";
import axios from "axios";
import useCompany from "@/components/hooks/useCompany";
import CopyIconButton from "@/components/common/CopyIconButton";

const Account = ({ user }: { user: userSchemaType }) => {
  const { mode } = useTheme();
  const [importWalletModal, setImportWalletmodal] = useState(false);
  const [loadingSignOut, setLoadingSignOut] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const userSession = session?.user as { role: string } | undefined;
  const isAdmin = userSession?.role === "admin";

  const { company } = useCompany();
  const primaryColor = company?.color.primary;
  const primaryLightColor = company?.color.primaryLight;

  const signOutHandler = async () => {
    setLoadingSignOut(true);
    try {
      await signOut().then(() => (window.location.href = "https://iwon.vc"));
      toast.success("Logged Out");
    } catch (error: any) {
      toast.error(error?.message);
      setLoadingSignOut(false);
    }
  };

  const uploadAvatarHandler = async (result: any, widget: any) => {
    try {
      widget.close();
      setLoading(true);
      const {
        public_id,
        url,
        secure_url,
        format,
        width,
        height,
        bytes,
        original_filename,
        created_at,
        etag,
        thumbnail_url,
      } = result.info;

      const { data } = await axios.post("/api/users/upload-avatar", {
        public_id,
        url,
        secure_url,
        format,
        width,
        height,
        bytes,
        original_filename,
        created_at,
        etag,
        thumbnail_url,
      });

      if (data.error) throw new Error(data.error);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col items-center gap-8 py-7 
      ${mode === "light" ? "text-slate-700" : "text-white"}`}
      >
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET || ""}
          onUpload={uploadAvatarHandler}
        >
          {({ open }) => (
            <div
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
              className="flex justify-center flex-col 
               items-center sm:cursor-pointer"
            >
              {user.avatar?.url && (
                <Avatar
                  src={user.avatar.url}
                  alt="its me"
                  size="xl"
                  radius="md"
                />
              )}

              {!user.avatar?.url && (
                <Avatar alt="its me" size="xl" radius="md">
                  {!loading && <IoMdPerson />}
                  {loading && (
                    <Loader
                      color={
                        mode === "light" ? primaryColor : primaryLightColor
                      }
                    />
                  )}
                </Avatar>
              )}
            </div>
          )}
        </CldUploadWidget>

        <div className="flex flex-col gap-1 items-center">
          <div>Invite Friends.</div>

          <CopyIconButton value={`https://iwon.vc/register/${user.username}`}>
            {`https://iwon.vc/register/${user.username}`}
          </CopyIconButton>

          <div
            onClick={signOutHandler}
            className={`flex items-center gap-3 mt-3 
              cursor-pointer font-medium 
              ${mode === "light" ? "text-slate-700" : "text-white"}`}
          >
            Sign Out
            {loadingSignOut ? (
              <Loader color={primaryLightColor} />
            ) : (
              <FaSignOutAlt
                color={mode === "light" ? primaryColor : primaryLightColor}
              />
            )}
          </div>
        </div>

        <Accordion className="w-full" defaultValue="Account">
          <PersonalDetail user={user} />
          {/* <WalletAddress /> */}
        </Accordion>

        <div
          className={`flex flex-col items-center 
      justify-center w-full sm:w-[60%] 
      gap-3`}
        >
          {isAdmin && (
            <Button
              onClick={() => router.push("/admin/dashboard")}
              label="Switch to admin"
            />
          )}
        </div>
      </div>

      <ImportWallerModal
        opened={importWalletModal}
        onClose={() => setImportWalletmodal(false)}
      />

      {/* <AboutUsModal
        opened={aboutUsModal}
        onClose={() => setAboutUsModal(false)}
      /> */}
    </>
  );
};

export default Account;
