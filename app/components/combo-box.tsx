/* eslint-disable*/
//@ts-nocheck
"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { ImageUpload } from "@/app/components/image-preview";

import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import axios from "axios";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { CloudinaryUploadReturnObject } from "@/types/cloudinaryUpload";
import { useSession } from "next-auth/react";
import { CompanyType } from "@/types/companyType";
import { formSectionProps } from "@/types/formSectionProps";

export function Combobox({ setFormData }: formSectionProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [file, setFile] = React.useState<File | null>(null);

  const [name, setName] = React.useState<string | null>(null);
  const [website, setWebsite] = React.useState<string | null>(null);

  const [companyName, setCompanyName] = React.useState<string>("");

  const [companies, setCompanies] = React.useState<CompanyType[]>();
  const [selectedCompany, setSelectedCompany] = React.useState<CompanyType>();

  const session = useSession();

  React.useEffect(()=>{
    setFormData("companyId", value);
  },[value])

  // const selectedCompany = companies.find((company) => company.value === value);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  async function fetchSignedUrl() {
    const res = await fetch("/api/job/get-upload-link");
    const signedUrl: CloudinaryUploadReturnObject = await res.json();
    return signedUrl;
  }

  async function uploadLogo() {
    if (!file) {
      return;
    }
    try {
      // Generate signed URL
      const signedUrl = await fetchSignedUrl();

      // Create FormData for upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signedUrl.api_key);
      formData.append("timestamp", signedUrl.timestamp.toString());
      formData.append("signature", signedUrl.signature);
      formData.append("folder", signedUrl.folder);

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${signedUrl.cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFormUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userId = session.data?.user?.id;
    if (!userId) {
      console.error("User ID is missing in session data");
      return;
    }

    const logoUrl = await uploadLogo();

    const response = await axios.post("/api/job/add-company", {
      userId,
      name,
      website,
      logo: logoUrl,
    });

    if (response.statusText !== "OK") {
      console.error("Failed to upload into database:", response);
    }
  }

  //fetch companies from the database
  React.useEffect(() => {
    if (session.status === "loading") {
      return; // Wait until the session status is not "loading"
    }

    const userId = session.data?.user?.id;
    if (!userId) {
      console.error("User ID is missing in session data");
      // console.log(session);
      return;
    }

    // console.log(companyName);
    // console.log(userId);

    axios
      .post(`/api/job/get-companies`, {
        userId,
        name: companyName,
      })
      .then((response) => {
        console.log(response.data);
        setCompanies([...response.data.companies]);
      });
  }, [companyName, session]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full bg-[#FFFCEF] justify-between h-16 text-xl"
        >
          <div className="flex items-center gap-2 w-full">
            {
            selectedCompany ? (
              <>
                <div className="relative h-6 w-6 shrink-0">
                  <Image
                    src={selectedCompany.logo || "/placeholder.svg"}
                    alt={selectedCompany.name}
                    className="rounded-sm object-contain"
                    fill
                    sizes="24px"
                  />
                </div>
                <span>{selectedCompany.name}</span>
              </>
            ) : (
              "Select company..."
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[40rem] overflow-auto  p-0 flex flex-col gap-6">
        <Command>
          <CommandInput
            placeholder="Search company..."
            className="h-9"
            value={companyName}
            onValueChange={(value:string) => {
              setCompanyName(value);
            }}
          />
          <CommandList>
            <CommandEmpty>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Add Company</Button>
                </PopoverTrigger>
                <PopoverContent className="w-[30rem]">
                  <form className="grid gap-4" onSubmit={handleFormUpload}>
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Add company</h4>
                      <section className="text-sm text-muted-foreground flex justify-center gap-8 ">
                        <ImageUpload handleFileChange={handleFileChange} />
                        <div className=" flex flex-col gap-6 w-full">
                          <div className="flex flex-col gap-4">
                            <Label htmlFor="Name">Name</Label>
                            <Input
                              id="Name"
                              className="col-span-2 h-8"
                              onChange={(event) => {
                                setName(event.target.value);
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-4">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="maxWidth"
                              className="col-span-2 h-8"
                              onChange={(e) => {
                                setWebsite(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </section>
                    </div>

                    <button type="submit" value={`Add`}>
                      Add
                    </button>
                  </form>
                </PopoverContent>
              </Popover>
            </CommandEmpty>
            <CommandGroup className="space-y-14 p-2 flex flex-col gap-8 ">
              {companies?.map((company) => (
                <CommandItem
                  key={company.name}
                  value={company.id}
                  onSelect={(currentValue:string) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    setOpen(false);
                    const selectCompany = companies.find(
                      (company) => company.id === newValue
                    );
                    setSelectedCompany(selectCompany);
                  }}
                  className={cn(
                    "flex items-center relative justify-center gap-2 test bg-[#FFFCEF] text-black p-2 rounded-lg shadow-md  mb-2 h-16 text-xl cursor-pointer",
                    value === company.name && "bg-[#FFEFAA] "
                  )}
                >
                  <div className=" h-6 w-6 flex justify-center  gap-4">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      className="rounded-sm object-contain !relative -left-4"
                      fill
                      sizes="24px"
                    />
                    <span>{company.name}</span>
                  </div>
                  {/* <Check
                    className={cn(
                      "ml-auto h-4 w-4 absolute right-4 ",
                      value === company.value ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}