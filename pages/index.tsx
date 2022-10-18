import axios from 'axios'
import { useEffect, useState} from 'react'
import { server } from '../utility/serverConfig'
import { Box, Button, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, InputLabel, Input } from '@mui/material'

export const getStaticProps = async () =>  {
  const configResponse = await axios.get(`${server}api/get/config`)
  const formConfig = configResponse.data
  const dataResponse =  await axios.get(`${server}api/get/data`)
  const repoData = dataResponse.data

  return {
    props: {
      formConfig, repoData
    }
  }
}


function Home({formConfig, repoData}: any) {
  const [value, setValue] = useState({});
  async function handleSubmit(event: any) {
    event.preventDefault();
    await axios.put(`${server}api/put/data`, JSON.stringify(value))
  };
  const handleChange = (e :any) => {
    setValue({
      ...value,
      [e.target.id]: e.target.value.trim()
    });
  };
  return (
     <Box
      component="form"
      sx={{
        display: 'grid',
        width: '50%',
        gap: 1,
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
       {formConfig.fields.map((field :any,key: number) => {

        let fieldValue = repoData.data.filter((w: { fieldId: number; }) => w.fieldId === field.id).map((v: {value : string | number;}) => v.value)[0]
        if(field.type === "select") {
          return (

            <FormControl variant="outlined" key={key}>
              <FormLabel>{field.name}</FormLabel>
              <RadioGroup onChange={handleChange} defaultValue={fieldValue}>

                {field.options?.map((option: any,key : number) => {

                  return (
                    <FormControlLabel  key={key} value={option.value} control={<Radio id={field.id}/>} label={option.name} />
                  )

                }
              )
            }
              </RadioGroup>
            </FormControl>

            );
        }
        else {
          return (

          <FormControl variant="outlined" key={key}>
            <InputLabel>{field.name}</InputLabel>
            <Input onChange={handleChange} id={field.id} type={field.type} defaultValue={fieldValue} />
          </FormControl>
          
          )
        }
    })}
    <Button type="submit" variant="outlined">Submit</Button>
    </Box> 
  );
};
export default Home
