const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

// Replace with your Supabase credentials
const supabaseUrl = 'https://your-supabase-url';
const supabaseAnonKey = 'your-supabase-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

app.post('/api/record-click', async (req, res) => {
  const { ip_address } = req.body;

  try {
    // Insert the click data into the Supabase table
    const { data, error } = await supabase
      .from('clicks')
      .insert([{ ip_address }]);

    if (error) {
      console.error('Error inserting click:', error);
      res.status(500).send('Error inserting click');
    } else {
      // Calculate the total click count
      const { data: totalClicksData, error: totalClicksError } = await supabase
        .from('clicks')
        .select('count(*)');

      if (totalClicksError) {
        console.error('Error fetching total clicks:', totalClicksError);
        res.status(500).send('Error fetching total clicks');
      } else {
        const totalClicks = totalClicksData[0].count;
        res.json({ totalClicks });
      }
    }
  } catch (error) {
    console.error('Error handling click:', error);
    res.status(500).send('Error handling click');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
