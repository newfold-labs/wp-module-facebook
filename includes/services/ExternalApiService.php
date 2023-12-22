<?php
namespace NewfoldLabs\WP\Module\Facebook\Services;


class ExternalApiService {
   public static function CallAPI($method, $url, $data = false)
    {
        $curl = curl_init();

        switch ($method)
        {
            case "POST":
                curl_setopt($curl, CURLOPT_POST, 1);
    
                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_PUT, 1);
                break;
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }
        $new_url = str_replace(' ', '', $url);
    
        curl_setopt($curl, CURLOPT_URL, $new_url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);

        
        $result = curl_exec($curl);
        
        if (curl_errno($curl)) {
            $error = curl_error($curl);
            curl_close($curl);
            return $error;
        }
        curl_close($curl);
        return json_decode($result);
    }
}

?>