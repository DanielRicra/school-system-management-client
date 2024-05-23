import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AddStudentSchema, type AddStudentData } from "@/schemas/add-student";

export function AddStudentForm() {
  const form = useForm<AddStudentData>({
    resolver: valibotResolver(AddStudentSchema),
  });

  function onSubmit(values: AddStudentData) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="gradeLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Level</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a grade level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1st">1st</SelectItem>
                  <SelectItem value="2nd">2nd</SelectItem>
                  <SelectItem value="3rd">3rd</SelectItem>
                  <SelectItem value="4th">4th</SelectItem>
                  <SelectItem value="5th">5th</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Id</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a User" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1e5e3ef7-2ee3-4f7b-ab5c-1c62d310a3b1">
                    Gandalf The Grey
                  </SelectItem>
                  <SelectItem value="1e5e3ef7-2ee3-4f7b-ab5c-1c62d310a3b2">
                    Legolas The Elf
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enrollmentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enrollment Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Enrollment Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="graduated">Graduated</SelectItem>
                  <SelectItem value="transferred">Transferred</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="classroomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classroom Id</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString() ?? ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Classroom" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">ADZD</SelectItem>
                  <SelectItem value="2">ABCD</SelectItem>
                  <SelectItem value="3">LKJD</SelectItem>
                  <SelectItem value="4">PLEO</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between w-full">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              form.reset({});
            }}
          >
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
