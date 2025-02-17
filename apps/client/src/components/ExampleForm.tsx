import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Button, Typography } from '@mui/material';
import { exampleFormSchema, type ExampleFormData } from '../utils/validationSchemas';

export const ExampleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExampleFormData>({
    resolver: zodResolver(exampleFormSchema),
  });

  const onSubmit = (data: ExampleFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Example Form
      </Typography>
      
      <TextField
        {...register('name')}
        label="Name"
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      
      <TextField
        {...register('email')}
        label="Email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      
      <TextField
        {...register('age', { valueAsNumber: true })}
        label="Age"
        type="number"
        fullWidth
        margin="normal"
        error={!!errors.age}
        helperText={errors.age?.message}
      />
      
      <TextField
        {...register('description')}
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        fullWidth
      >
        Submit
      </Button>
    </Box>
  );
};
