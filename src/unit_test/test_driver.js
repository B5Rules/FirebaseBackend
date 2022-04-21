import testGetProfileData from "./test_get_profile_data";
import testInsertProfile from "./test_insert_profile"
import testQueryEmail from "./test_query_email";

const testDriver = async function(){
    await testInsertProfile();
    await testGetProfileData();
    await testQueryEmail();
}

export default testDriver;