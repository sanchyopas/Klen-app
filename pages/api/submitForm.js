export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${API_URL}/api/mail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке данных на внешний API');
            }

            const responseData = await response.json();
            res.status(200).json({ success: true, data: responseData });
        } catch (error) {
            console.error('Ошибка:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Метод не разрешен' });
    }
}