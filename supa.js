
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lnboqislxbvionxukizw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

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
