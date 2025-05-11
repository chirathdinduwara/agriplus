import FarmingDetails from '../../models/special_function_model/farmingDetails.model.js';
import dotenv from "dotenv";
import axios from 'axios';
import FarmingTasks from '../../models/special_function_model/Tasks.model.js';
import Product from '../../models/product_model/product.model.js';
dotenv.config();

const API_KEY = process.env.API_KEY;

export const createDetails= async (req,res) => {
    const { farmer_id, farmer_name, crop_name, area, location} = req.body;

    if (!farmer_id || !farmer_name || !crop_name || !area || !location) {
        return res.status(400).json({ success: false, message: "Please Provide All Fields" });
      }
    
      try {
        
        const newDetails = new FarmingDetails({ farmer_id, farmer_name, crop_name, area, location});
    
        await newDetails.save();
        res.status(201).json({ success: true, message: "Details added successfully" });
    
      } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
      }
}

export const allDetails =  async (req, res) => {
  try {
    const details = await FarmingDetails.find();
    res.status(200).json({ success: true, details });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await FarmingDetails.findById(id);
    res.status(200).json({ success: true, detail });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeDetail = async (req, res) => {
  const { id } = req.params;
  try {
    await FarmingDetails.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Details Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};

export const updateDetail = async (req, res) => {
  const { id } = req.params; 
  const { farmer_id, farmer_name, crop_name, area, location} = req.body;
  
  try {
    // Find the user by ID and update their details
    const detail = await FarmingDetails.findByIdAndUpdate(id, {
      farmer_id, farmer_name, crop_name, area, location
    }, { new: true }); 

    if (!detail) {
      return res.status(404).json({ success: false, message: "detail not found" });
    }

    res.status(200).json({ success: true, detail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Weather
export const getWeather = async (req, res) => {
  const { city } = req.params;

  try {
    // Make the request to OpenWeatherMap API
    const response = await axios.get("https://pro.openweathermap.org/data/2.5/forecast/daily", {
      params: {
        q: city,
        appid: API_KEY, 
        units: "metric",
        cnt: 7 
      }
    });

    res.json(response.data); 

  } catch (error) {
    console.error("Error fetching weather data:", error.message);

    res.status(500).json({
      error: "Error fetching weather data",
      message: error.message
    });
  }
};

//FarmerTasks
export const createTasks = async (req,res) => {
  const { crop_name, season, location, state, tasks} = req.body;

  if (!crop_name || !season || !location || !state || !tasks) {
      return res.status(400).json({ success: false, message: "Please Provide All Fields" });
    }
  
    try {
      
      const newDetails = new FarmingTasks({ crop_name, season, location, state, tasks});
  
      await newDetails.save();
      res.status(201).json({ success: true, message: "Details added successfully" });
  
    } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getTask = async (req, res) => {
  const { crop_name, location } = req.query;

  try {
    const detail = await FarmingTasks.findOne({
      crop_name: crop_name,
      location: location,
    });

    if (!detail) {
      return res.status(404).json({ success: false, message: "No farming details found for this crop and location." });
    }

    res.status(200).json({ success: true, tasks: detail.tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};



const extractKeywordsUsingGemini = async (taskList) => {
  const allTasksText = taskList.join(" ");

  const prompt = `Extract only [Fertilizer, Pesticides, Herbicides] from the following text:\n\n${allTasksText}\n\nOnly return the keywords separated by commas`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const keywords = content.split(',').map(word => word.trim().toLowerCase());
    return keywords;

  } catch (error) {
    console.error("Error using Gemini:", error.response?.data || error.message);
    return [];
  }
};



export const getProductsByKeywords = async (req, res) => {
  const { crop_name, location, selectedPeriod } = req.query;

  try {
    const taskDetails = await FarmingTasks.findOne({ crop_name, location });

    if (!taskDetails) {
      return res.status(404).json({ success: false, message: 'No tasks found' });
    }

    const selectedTasks = taskDetails.tasks.filter(task => task.period === selectedPeriod);

    if (selectedTasks.length === 0) {
      return res.status(404).json({ success: false, message: 'No tasks found for the selected period' });
    }


    const keywords = (
       await extractKeywordsUsingGemini(selectedTasks.flatMap(task => task.task_list))
       ).map(word => word.charAt(0).toUpperCase() + word.slice(1));



    const matchedProducts = await Product.find({
      cetegory: { $in: keywords }  
    });

    res.status(200).json({
      success: true,
      keywords: keywords,
      matchedProducts: matchedProducts
    });

  } catch (err) {
    console.error("Error in getProductsByKeywords:", err);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};
