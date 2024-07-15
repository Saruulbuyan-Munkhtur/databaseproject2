import org.bson.BsonReader;
import org.bson.BsonType;
import org.bson.BsonWriter;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;

import java.util.Arrays;

public class StringArrayCodec implements Codec<String[]> {

    @Override
    public String[] decode(BsonReader reader, DecoderContext decoderContext) {
        reader.readStartArray();
        int size = 0;
        while (reader.readBsonType() != BsonType.END_OF_DOCUMENT) {
            reader.readString();
            size++;
        }
        reader.readEndArray();
        String[] array = new String[size];
        for (int i = 0; i < size; i++) {
            array[i] = reader.readString();
        }
        return array;
    }

    @Override
    public void encode(BsonWriter writer, String[] value, EncoderContext encoderContext) {
        writer.writeStartArray();
        for (String s : value) {
            writer.writeString(s);
        }
        writer.writeEndArray();
    }

    @Override
    public Class<String[]> getEncoderClass() {
        return String[].class;
    }
}
